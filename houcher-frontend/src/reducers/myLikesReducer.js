import userService from '../services/user';

const startFetching = (state) => ({
  ...state,
  isFetching: true,
  hasFetchError: false,
});

const fetchSuccess = (state, action) => ({
  ...state,
  isFetching: false,
  hasFetchError: false,
  user: action.data,
});

const hasFetchError = (state, action) => ({
  ...state,
  hasFetchError: true,
  isFetching: false,
  errorMessage: action.data.message,
});

export const fetchMyLikes = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'FETCH_MYLIKES',
      });
      const response = await userService.getUserPopulated(id);
      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: 'FETCH_MYLIKES_SUCCESS',
          data: response.data,
        });
      }
    } catch (exception) {
      dispatch({
        type: 'HAS_FETCH_ERROR_MYLIKES',
        data: exception,
      });
    }
  };
};

export const setMyLikes = (apartment) => {
  return {
    type: 'SET_MYLIKES',
    data: apartment,
  };
};

export const resetMyLikes = () => {
  return {
    type: 'RESET_MYLIKES',
    data: {
      user: {},
      isFetching: false,
      hasFetchError: false,
      errorMessage: null,
    }
  };
};

const myLikesReducer = (
  state = {
    user: {},
    isFetching: false,
    hasFetchError: false,
    errorMessage: null,
  },
  action
) => {
  switch (action.type) {
    case 'SET_MYLIKES':
      return { ...state, apartment: action.data };
    case 'FETCH_MYLIKES':
      return startFetching(state);
    case 'FETCH_MYLIKES_SUCCESS':
      return fetchSuccess(state, action);
    case 'HAS_FETCH_ERROR_MYLIKES':
      return hasFetchError(state, action);
    case 'RESET_MYLIKES':
      return action.data;
    default:
      return state;
  }
};

export default myLikesReducer;
