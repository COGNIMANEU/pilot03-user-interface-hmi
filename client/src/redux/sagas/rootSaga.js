import { all } from 'redux-saga/effects';
import alertSaga from './alertSaga';
import sessionSaga from './sessionSaga';
import authSaga from './authSaga';
import userSaga from './userSaga';

export default function* rootSaga() {
  yield all([
    alertSaga(),
    sessionSaga(),
    authSaga(),
    userSaga(),
  ]);
}