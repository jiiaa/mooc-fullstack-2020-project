const initialState = {
  token: '',
  expireTime: '',
  id: '',
  username: '',
  firstname: '',
  lastname: '',
  alias: '',
  myHome: '',
  myLikes: [],
  newApartmentType: '',
  newNumberOfRooms: '',
  newPostalCode: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.user;
    case 'RESET_USER':
      return action.user;
    default:
      return state;
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user
  }
}

export const resetUser = () => {
  return {
    type: 'RESET_USER',
    user: {}
  }
}

export default  userReducer;
