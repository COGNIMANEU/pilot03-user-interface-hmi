import { call, put, takeEvery } from 'redux-saga/effects';
import axios from '../config/axiosConfig';
import { loginSuccess, loginFailure, updatePasswordSuccess, updatePasswordFailure } from '../actions/authActions';

function* login(action) {
  try {
    const response = yield call(axios.post, '/api/users/login', action.payload);
    const { token, user, rememberMe } = response.data;
    yield put(loginSuccess(user, token, rememberMe));
  } catch (error) {
    yield put(loginFailure(error.response.data.message));
  }
}

function* updatePassword(action) {
  try {
    const response = yield call(axios.put, '/api/users/update-password', action.payload);
    yield put(updatePasswordSuccess(response.data));
  } catch (error) {
    yield put(updatePasswordFailure(error.response.data.message));
  }
}

function* authSaga() {
  yield takeEvery('LOGIN_REQUEST', login);
  yield takeEvery('UPDATE_PASSWORD_REQUEST', updatePassword);
}

export default authSaga;