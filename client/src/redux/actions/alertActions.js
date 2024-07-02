export const fetchAlertsRequest = (page, limit) => ({
  type: 'FETCH_ALERTS_REQUEST',
  payload: { page, limit }
});

export const fetchAlertsSuccess = (alerts, totalPages, currentPage) => ({
  type: 'FETCH_ALERTS_SUCCESS',
  payload: { alerts, totalPages, currentPage }
});

export const fetchAlertsFailure = error => ({
  type: 'FETCH_ALERTS_FAILURE',
  error
});

export const updateAlertStatusRequest = (id, status) => ({
  type: 'UPDATE_ALERT_STATUS_REQUEST',
  payload: { id, status }
});

export const updateAlertStatusSuccess = (id, status) => ({
  type: 'UPDATE_ALERT_STATUS_SUCCESS',
  payload: { id, status }
});

export const updateAlertStatusFailure = error => ({
  type: 'UPDATE_ALERT_STATUS_FAILURE',
  error
});

export const fetchUnresolvedCountRequest = () => ({
  type: 'FETCH_UNRESOLVED_COUNT_REQUEST'
});

export const fetchUnresolvedCountSuccess = count => ({
  type: 'FETCH_UNRESOLVED_COUNT_SUCCESS',
  payload: count
});

export const fetchUnresolvedCountFailure = error => ({
  type: 'FETCH_UNRESOLVED_COUNT_FAILURE',
  error
});