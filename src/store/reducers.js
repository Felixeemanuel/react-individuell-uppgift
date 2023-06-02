const initialAuthState = {
  token: null,
  admin: null,
};

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload.token,
      };
    case 'SET_ADMIN':
      return {
        ...state,
        admin: action.payload,
      };
    case 'CLEAR_ADMIN':
      return {
        ...state,
        token: null,
        admin: null,
      };
    default:
      return state;
  }
};

export default authReducer;
