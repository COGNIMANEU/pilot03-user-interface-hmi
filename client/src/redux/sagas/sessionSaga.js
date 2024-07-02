import { call, put, takeLatest } from 'redux-saga/effects';
import axios from '../config/axiosConfig';
import {
  FETCH_SESSIONS_REQUEST,
  FETCH_SESSIONS_SUCCESS,
  FETCH_SESSIONS_FAILURE,
  FETCH_SESSION_BY_ID_REQUEST,
  FETCH_SESSION_BY_ID_SUCCESS,
  FETCH_SESSION_BY_ID_FAILURE,
  UPDATE_SESSION_REQUEST,
  UPDATE_SESSION_SUCCESS,
  UPDATE_SESSION_FAILURE,
  DELETE_SESSION_REQUEST,
  DELETE_SESSION_SUCCESS,
  DELETE_SESSION_FAILURE,
  ADVANCE_STAGE_REQUEST,
  ADVANCE_STAGE_SUCCESS,
  ADVANCE_STAGE_FAILURE,
  UPDATE_STAGE_STATUS_REQUEST,
  UPDATE_STAGE_STATUS_SUCCESS,
  UPDATE_STAGE_STATUS_FAILURE,
} from '../actions/sessionActions';
import { notification } from 'antd';
function* fetchSessions(action) {
  try {
    const response = yield call(axios.get, `/api/sessions?page=${action.payload.page}&limit=${action.payload.limit}`);
    yield put({ type: FETCH_SESSIONS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_SESSIONS_FAILURE, payload: error.message });
  }
}

function* fetchSessionById(action) {
  try {
    const response = yield call(axios.get, `/api/sessions/${action.payload}`);
    yield put({ type: FETCH_SESSION_BY_ID_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_SESSION_BY_ID_FAILURE, payload: error.message });
  }
}

function* updateSession(action) {
  try {
    const response = yield call(axios.put, `/api/sessions/${action.payload.id}`, action.payload.values);
    yield put({ type: UPDATE_SESSION_SUCCESS, payload: response.data });
    notification.success({
      message: 'Update Successful',
      description: 'The session has been updated successfully.',
    });
  } catch (error) {
    yield put({ type: UPDATE_SESSION_FAILURE, payload: error.message });
    notification.error({
      message: 'Update Failed',
      description: 'Failed to update the session. Please try again.',
    });
  }
}

function* deleteSession(action) {
  try {
    yield call(axios.delete, `/api/sessions/${action.payload}`);
    yield put({ type: DELETE_SESSION_SUCCESS, payload: action.payload });
    yield put({ type: FETCH_SESSIONS_REQUEST });
  } catch (error) {
    yield put({ type: DELETE_SESSION_FAILURE, payload: error.message });
  }
}

function* advanceStage(action) {
  try {
    const response = yield call(axios.post, `/api/sessions/${action.payload}/advance`);
    yield put({ type: ADVANCE_STAGE_SUCCESS, payload: response.data });
    yield put({ type: FETCH_SESSION_BY_ID_REQUEST, payload: action.payload });
  } catch (error) {
    yield put({ type: ADVANCE_STAGE_FAILURE, payload: error.message });
  }
}

function* updateStageStatus(action) {
  try {
    const response = yield call(axios.post, `/api/sessions/${action.payload.id}/update-stage-status`, {
      stageIndex: action.payload.stageIndex,
      newStatus: action.payload.newStatus,
    });
    yield put({ type: UPDATE_STAGE_STATUS_SUCCESS, payload: response.data });
    notification.success({
      message: 'Stage Status Updated',
      description: 'The stage status has been updated successfully.',
    });
    yield put({ type: FETCH_SESSION_BY_ID_REQUEST, payload: action.payload.id });
  } catch (error) {
    yield put({ type: UPDATE_STAGE_STATUS_FAILURE, payload: error.message });
    notification.error({
      message: 'Update Failed',
      description: 'Failed to update the stage status. Please try again.',
    });
  }
}

function* sessionSaga() {
  yield takeLatest(FETCH_SESSIONS_REQUEST, fetchSessions);
  yield takeLatest(FETCH_SESSION_BY_ID_REQUEST, fetchSessionById);
  yield takeLatest(UPDATE_SESSION_REQUEST, updateSession);
  yield takeLatest(DELETE_SESSION_REQUEST, deleteSession);
  yield takeLatest(ADVANCE_STAGE_REQUEST, advanceStage);
  yield takeLatest(UPDATE_STAGE_STATUS_REQUEST, updateStageStatus);
}

export default sessionSaga;