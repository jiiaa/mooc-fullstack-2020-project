const loginReducer = (state = false, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return true;
    case 'LOGOUT_USER':
      return false;
    default:
      return state;
  }
};

export const userLogin = () => {
  return {
    type: 'LOGIN_USER',
  };
};

export const userLogout = () => {
  return {
    type: 'LOGOUT_USER',
  };
};

export default loginReducer;
