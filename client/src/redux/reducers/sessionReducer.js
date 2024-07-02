const initialState = {
  sessions: [],
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_SESSIONS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_SESSIONS_SUCCESS":
      return { ...state, loading: false, sessions: action.payload.sessions,totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage };
    case "FETCH_SESSIONS_FAILURE":
      return { ...state, loading: false, error: action.error };
    case "CREATE_SESSION_REQUEST":
      return { ...state, loading: true, error: null };
    case "CREATE_SESSION_SUCCESS":
      return {
        ...state,
        loading: false,
        sessions: [...state.sessions, action.payload],
      };
    case "CREATE_SESSION_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "FETCH_SESSION_BY_ID_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_SESSION_BY_ID_SUCCESS":
      return { ...state, loading: false, currentSession: action.payload };
    case "FETCH_SESSION_BY_ID_FAILURE":
      return { ...state, loading: false, error: action.payload };
      case 'UPDATE_SESSION_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'FETCH_SESSION_BY_ID_SUCCESS':
        return { ...state, loading: false, currentSession: action.payload };
      case 'UPDATE_SESSION_SUCCESS':
        return {
          ...state,
          loading: false,
          currentSession: action.payload,
          sessions: state.sessions.map((session) =>
            session._id === action.payload._id ? action.payload : session
          ),
        };
    case "DELETE_SESSION_REQUEST":
      return { ...state, loading: true, error: null };
    case "DELETE_SESSION_SUCCESS":
      return {
        ...state,
        loading: false,
        sessions: state.sessions.filter(
          (session) => session._id !== action.payload
        ),
      };
    case "DELETE_SESSION_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default sessionReducer;
