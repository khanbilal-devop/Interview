import { all } from 'redux-saga/effects';
import authSaga from './Auth/saga';
import userSaga from "./Users/saga"
// import userSaga from "./user/saga"
// import authSaga from "./authAndRegister/saga"

export default function* rootSaga(getState) {
  yield all([
    authSaga(),
    userSaga()
    // httpHandlerSaga(),
    // cartSaga(),
    // userSaga(),
    // authSaga()
  ]);
}
