export const createUserRequest = (user) => ({
  type: 'CREATE_USER_REQUEST',
  payload: user,
});

export const createUserSuccess = () => ({
  type: 'CREATE_USER_SUCCESS',
});

export const createUserFailure = (error) => ({
  type: 'CREATE_USER_FAILURE',
  payload: error,
});