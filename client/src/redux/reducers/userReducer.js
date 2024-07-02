const initialState = {
  error: null,
  success: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_USER_REQUEST':
      return {
        ...state,
        error: null,
        success: null,
      };
    case 'CREATE_USER_SUCCESS':
      return {
        ...state,
        success: 'User created successfully!',
      };
    case 'CREATE_USER_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;