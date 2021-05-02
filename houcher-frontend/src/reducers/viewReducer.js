const viewReducer = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_ALL':
      return true;
    case 'SHOW_SIX':
      return false;
    default:
      return state;
  }
};

export const showAll = () => {
  return {
    type: 'SHOW_ALL',
  };
};

export const showSix = () => {
  return {
    type: 'SHOW_SIX',
  };
};

export default viewReducer;
