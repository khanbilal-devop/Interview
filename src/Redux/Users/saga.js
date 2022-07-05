import { all, fork, put, takeEvery } from "redux-saga/effects";
import { DEFAULT_MESSAGE } from "../../Constant";
import { GET_USERS } from "./types";
import { getUsersService } from "./services";
import { saveUsers } from "./actions";

export function* watchGetUsers() {
  yield takeEvery(GET_USERS, getUsers);
}

function* getUsers({ payload }) {
  const { data } = payload;
  try {
    let response = yield getUsersService(data)
      .then((response) => response?.data)
      .catch((error) => error?.response?.data || DEFAULT_MESSAGE);
    console.log(response);
    if (response?.status === 200) {
      yield put(
        saveUsers(
          { data: response?.data,totalElements : response?.totalElements,totalPages : response?.totalPages },
          response?.message || DEFAULT_MESSAGE
        )
      );
    } else {
      yield put(
        saveUsers(
          { data: [], totalElements: 0, totalPages: 0 },
          response?.errorMessage || response?.message
        )
      );
    }
  } catch (error) {
    console.error(
      "Exception Occurs In authAndRegister.saga.loginUser : ",
      error
    );
  }
}

export default function* rootSaga() {
  yield all([fork(watchGetUsers)]);
}
