import { call, put, takeEvery } from 'redux-saga/effects';
import axios from '../config/axiosConfig';
import {
  fetchAlertsSuccess,
  fetchAlertsFailure,
  updateAlertStatusSuccess,
  updateAlertStatusFailure,
  fetchUnresolvedCountSuccess,
  fetchUnresolvedCountFailure,
  fetchUnresolvedCountRequest
} from '../actions/alertActions';

function* fetchAlerts(action) {
  try {
    const response = yield call(axios.get, `/api/alerts?page=${action.payload.page}&limit=${action.payload.limit}`);
    yield put(fetchAlertsSuccess(response.data.alerts, response.data.totalPages, response.data.currentPage));
  } catch (error) {
    yield put(fetchAlertsFailure(error.message));
  }
}

function* updateAlertStatus(action) {
  try {
    yield call(axios.put, `/api/alerts/${action.payload.id}/status`, { status: action.payload.status });
    yield put(updateAlertStatusSuccess(action.payload.id, action.payload.status));
    // Refetch the unresolved count after resolving an alert
    yield put(fetchUnresolvedCountRequest());
  } catch (error) {
    yield put(updateAlertStatusFailure(error.message));
  }
}

function* fetchUnresolvedCount() {
  try {
    const response = yield call(axios.get, '/api/alerts/unresolved-count');
    yield put(fetchUnresolvedCountSuccess(response.data.count));
  } catch (error) {
    yield put(fetchUnresolvedCountFailure(error.message));
  }
}

function* alertSaga() {
  yield takeEvery('FETCH_ALERTS_REQUEST', fetchAlerts);
  yield takeEvery('UPDATE_ALERT_STATUS_REQUEST', updateAlertStatus);
  yield takeEvery('FETCH_UNRESOLVED_COUNT_REQUEST', fetchUnresolvedCount);
}

export default alertSaga;