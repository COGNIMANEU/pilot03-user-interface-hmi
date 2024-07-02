import { call, put, takeEvery } from 'redux-saga/effects';
import axios from '../config/axiosConfig';
import { createUserSuccess, createUserFailure } from '../actions/userActions';

function* createUser(action) {
  try {
    yield call(axios.post, '/api/users/create-user', action.payload);
    yield put(createUserSuccess());
  } catch (error) {
    yield put(createUserFailure(error.response.data.message));
  }
}

function* userSaga() {
  yield takeEvery('CREATE_USER_REQUEST', createUser);
}

export default userSaga;