// Define action types
export const FETCH_SESSIONS_REQUEST = 'FETCH_SESSIONS_REQUEST';
export const FETCH_SESSIONS_SUCCESS = 'FETCH_SESSIONS_SUCCESS';
export const FETCH_SESSIONS_FAILURE = 'FETCH_SESSIONS_FAILURE';

export const FETCH_SESSION_BY_ID_REQUEST = 'FETCH_SESSION_BY_ID_REQUEST';
export const FETCH_SESSION_BY_ID_SUCCESS = 'FETCH_SESSION_BY_ID_SUCCESS';
export const FETCH_SESSION_BY_ID_FAILURE = 'FETCH_SESSION_BY_ID_FAILURE';

export const UPDATE_SESSION_REQUEST = 'UPDATE_SESSION_REQUEST';
export const UPDATE_SESSION_SUCCESS = 'UPDATE_SESSION_SUCCESS';
export const UPDATE_SESSION_FAILURE = 'UPDATE_SESSION_FAILURE';

export const CREATE_SESSION_REQUEST = 'CREATE_SESSION_REQUEST';
export const CREATE_SESSION_SUCCESS = 'CREATE_SESSION_SUCCESS';
export const CREATE_SESSION_FAILURE = 'CREATE_SESSION_FAILURE';

export const DELETE_SESSION_REQUEST = 'DELETE_SESSION_REQUEST';
export const DELETE_SESSION_SUCCESS = 'DELETE_SESSION_SUCCESS';
export const DELETE_SESSION_FAILURE = 'DELETE_SESSION_FAILURE';

export const ADVANCE_STAGE_REQUEST = 'ADVANCE_STAGE_REQUEST';
export const ADVANCE_STAGE_SUCCESS = 'ADVANCE_STAGE_SUCCESS';
export const ADVANCE_STAGE_FAILURE = 'ADVANCE_STAGE_FAILURE';

export const UPDATE_STAGE_STATUS_REQUEST = 'UPDATE_STAGE_STATUS_REQUEST';
export const UPDATE_STAGE_STATUS_SUCCESS = 'UPDATE_STAGE_STATUS_SUCCESS';
export const UPDATE_STAGE_STATUS_FAILURE = 'UPDATE_STAGE_STATUS_FAILURE';

// Define action creators
export const fetchSessionsRequest = (page, limit) => ({
  type: FETCH_SESSIONS_REQUEST,
  payload: { page, limit }
});

export const fetchSessionsSuccess = (sessions) => ({
  type: FETCH_SESSIONS_SUCCESS,
  payload: sessions,
});

export const fetchSessionsFailure = (error) => ({
  type: FETCH_SESSIONS_FAILURE,
  payload: error,
});

export const fetchSessionByIdRequest = (id) => ({
  type: FETCH_SESSION_BY_ID_REQUEST,
  payload: id,
});

export const fetchSessionByIdSuccess = (session) => ({
  type: FETCH_SESSION_BY_ID_SUCCESS,
  payload: session,
});

export const fetchSessionByIdFailure = (error) => ({
  type: FETCH_SESSION_BY_ID_FAILURE,
  payload: error,
});

export const updateSessionRequest = (id, values) => ({
  type: UPDATE_SESSION_REQUEST,
  payload: { id, values },
});

export const updateSessionSuccess = (session) => ({
  type: UPDATE_SESSION_SUCCESS,
  payload: session,
});

export const updateSessionFailure = (error) => ({
  type: UPDATE_SESSION_FAILURE,
  payload: error,
});

export const createSessionRequest = (id, values) => ({
  type: CREATE_SESSION_REQUEST,
  payload: { id, values },
});

export const createSessionSuccess = (session) => ({
  type: CREATE_SESSION_SUCCESS,
  payload: session,
});

export const createSessionFailure = (error) => ({
  type: CREATE_SESSION_FAILURE,
  payload: error,
});

export const deleteSessionRequest = (id) => ({
  type: DELETE_SESSION_REQUEST,
  payload: id,
});

export const deleteSessionSuccess = (id) => ({
  type: DELETE_SESSION_SUCCESS,
  payload: id,
});

export const deleteSessionFailure = (error) => ({
  type: DELETE_SESSION_FAILURE,
  payload: error,
});

export const advanceStageRequest = (id) => ({
  type: ADVANCE_STAGE_REQUEST,
  payload: id,
});

export const advanceStageSuccess = (session) => ({
  type: ADVANCE_STAGE_SUCCESS,
  payload: session,
});

export const advanceStageFailure = (error) => ({
  type: ADVANCE_STAGE_FAILURE,
  payload: error,
});

export const updateStageStatusRequest = (id, stageIndex, newStatus) => ({
  type: UPDATE_STAGE_STATUS_REQUEST,
  payload: { id, stageIndex, newStatus },
});

export const updateStageStatusSuccess = (session) => ({
  type: UPDATE_STAGE_STATUS_SUCCESS,
  payload: session,
});

export const updateStageStatusFailure = (error) => ({
  type: UPDATE_STAGE_STATUS_FAILURE,
  payload: error,
});