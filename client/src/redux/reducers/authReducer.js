const initialState = {
  user: null,
  error: null,
  loginAttempts: 0,
  maxAttemptsReached: false,
  success: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        loginAttempts: 0,
        maxAttemptsReached: false,
        isAuthenticated: true,
      };
    case 'LOGIN_FAILURE':
      const newLoginAttempts = state.loginAttempts + 1;
      return {
        ...state,
        error: action.payload,
        loginAttempts: newLoginAttempts,
        maxAttemptsReached: newLoginAttempts >= 3,
        isAuthenticated: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case 'UPDATE_PASSWORD_REQUEST':
      return {
        ...state,
        error: null,
        success: null,
      };
    case 'UPDATE_PASSWORD_SUCCESS':
      return {
        ...state,
        success: 'Password updated successfully!',
      };
    case 'UPDATE_PASSWORD_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;