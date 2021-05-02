const loaderReducer = (state = false, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return true;
    case 'STOP_LOADING':
      return false;
    default:
      return state;
  }
};

export const startLoading = () => {
  return {
    type: 'START_LOADING',
  };
};

export const stopLoading = () => {
  return {
    type: 'STOP_LOADING',
  };
};

export default loaderReducer;
