const initialState = {
  alerts: [],
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,
  unresolvedCount: 0
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ALERTS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_ALERTS_SUCCESS':
      return {
        ...state,
        loading: false,
        alerts: action.payload.alerts,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage
      };
    case 'FETCH_ALERTS_FAILURE':
      return { ...state, loading: false, error: action.error };
    case 'UPDATE_ALERT_STATUS_SUCCESS':
      return {
        ...state,
        alerts: state.alerts.map(alert =>
          alert._id === action.payload.id
            ? { ...alert, status: action.payload.status }
            : alert
        )
      };
    case 'UPDATE_ALERT_STATUS_FAILURE':
      return { ...state, error: action.error };
    case 'FETCH_UNRESOLVED_COUNT_SUCCESS':
      return {
        ...state,
        unresolvedCount: action.payload
      };
    case 'FETCH_UNRESOLVED_COUNT_FAILURE':
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default alertReducer;