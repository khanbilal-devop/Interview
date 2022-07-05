import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { DEFAULT_MESSAGE } from '../../Constant';
import { LOGIN_USER, LOGOUT_USER } from './types';
import { storeToken ,deleteToken} from  './../../Helpers/token'
import {loginService} from './services';
import { loginUserError,loginUserSuccess } from './action';

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, loginUser);
}

function* loginUser({ payload }) {
  const { data } = payload;
  const {history} = payload;
  try {
    let response = yield loginService(data)
      .then((response) => response?.data)
      .catch((error) => error?.response?.data || DEFAULT_MESSAGE);
    if (response?.status === 200) {
      yield storeToken(response?.data || "");
      yield put(loginUserSuccess(response?.message))
      history('/listing');
    } else {
      yield put(loginUserError(response?.errorMessage || response?.message || DEFAULT_MESSAGE));
    }
  } catch (error) {
    console.error(
      "Exception Occurs In authAndRegister.saga.loginUser : ",
      error
    );
  }
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logoutUser);
}

function* logoutUser({ payload }) {
  try {
    yield deleteToken();
    payload('/login')
  } catch (error) {
    console.error(" Exception Occurs In auth.saga.logout : ", error);
  }
}


export default function* rootSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
    ]);
}