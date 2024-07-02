export const loginRequest = (credentials) => ({
  type: 'LOGIN_REQUEST',
  payload: credentials,
});

export const loginSuccess = (user, token, rememberMe) => {
  if (rememberMe) {
    try {
      localStorage.setItem('token', token);
      console.log('Token has been saved to localStorage: ', token)
    } catch (error) {
      console.error('Cannot save token')
      console.error(error)
    }
  } else {
    try {
      sessionStorage.setItem('token', token);
      console.log('Token has been saved to sessionStorage: ', token)
    } catch (error) {
      console.error('Cannot save token')
      console.error(error)
    }
  }
  return {
    type: 'LOGIN_SUCCESS',
    payload: user,
  };
};


export const loginFailure = (error) => ({
  type: 'LOGIN_FAILURE',
  payload: error,
});

export const logout = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
  return {
    type: 'LOGOUT',
  };
};

export const updatePasswordRequest = (passwordData) => ({
  type: 'UPDATE_PASSWORD_REQUEST',
  payload: passwordData,
});

export const updatePasswordSuccess = () => ({
  type: 'UPDATE_PASSWORD_SUCCESS',
});

export const updatePasswordFailure = (error) => ({
  type: 'UPDATE_PASSWORD_FAILURE',
  payload: error,
});