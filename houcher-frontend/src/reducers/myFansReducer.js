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
  myFans: action.data,
});

const hasFetchError = (state, action) => ({
  ...state,
  hasFetchError: true,
  isFetching: false,
  errorMessage: action.data.message,
});

export const fetchMyFans = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'FETCH_MYFANS',
      });
      const response = await userService.getUserFansHomes(id);
      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: 'FETCH_MYFANS_SUCCESS',
          data: response.data,
        });
      }
    } catch (exception) {
      dispatch({
        type: 'HAS_FETCH_ERROR_MYFANS',
        data: exception,
      });
    }
  };
};

export const resetMyFans = () => {
  return {
    type: 'RESET_MYFANS',
    data: {
      myFans: [],
      isFetching: false,
      hasFetchError: false,
      errorMessage: null,
    }
  };
};

const myFansReducer = (
  state = {
    myFans: [],
    isFetching: false,
    hasFetchError: false,
    errorMessage: null,
  },
  action
) => {
  switch (action.type) {
    case 'FETCH_MYFANS':
      return startFetching(state);
    case 'FETCH_MYFANS_SUCCESS':
      return fetchSuccess(state, action);
    case 'HAS_FETCH_ERROR_MYFANS':
      return hasFetchError(state, action);
    case 'RESET_MYFANS':
      return action.data;
    default:
      return state;
  }
};

export default myFansReducer;
