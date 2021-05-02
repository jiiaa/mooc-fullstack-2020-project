const newLikesReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NEWLIKES':
      return action.number;
    case 'CLEAR_NEWLIKES':
      return null;
    default:
      return state;
  }
};

export const setNewLikes = (number) => {
  return {
    type: 'SET_NEWLIKES',
    number,
  };
};

export const clearNewLikes = () => {
  return {
    type: 'CLEAR_NEWLIKES'
  }
};

export default newLikesReducer;
