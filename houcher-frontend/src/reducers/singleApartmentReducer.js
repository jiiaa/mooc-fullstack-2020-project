import apartmentService from '../services/apartments';

const startFetching = (state) => ({
  ...state,
  isFetching: true,
  hasFetchError: false,
});

const fetchSuccess = (state, action) => ({
  ...state,
  isFetching: false,
  hasFetchError: false,
  apartment: action.data,
});

const hasFetchError = (state, action) => ({
  ...state,
  hasFetchError: true,
  isFetching: false,
  errorMessage: action.data.message,
});

export const fetchSingleApartment = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'FETCH_APARTMENT',
      });
      const response = await apartmentService.getSingle(id);
      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: 'FETCH_APARTMENT_SUCCESS',
          data: response.data,
        });
      }
    } catch (exception) {
      dispatch({
        type: 'HAS_FETCH_ERROR_APARTMENT',
        data: exception,
      });
    }
  };
};

export const resetSingleApartment = () => {
  return {
    type: 'RESET_SINGLE_APARTMENT',
    data: {
      apartment: {},
      isFetching: false,
      hasFetchError: false,
      errorMessage: null,
    }
  };
};

const singleApartmentReducer = (
  state = {
    apartment: {},
    isFetching: false,
    hasFetchError: false,
    errorMessage: null,
  },
  action
) => {
  switch (action.type) {
    case 'FETCH_APARTMENT':
      return startFetching(state);
    case 'FETCH_APARTMENT_SUCCESS':
      return fetchSuccess(state, action);
    case 'HAS_FETCH_ERROR_APARTMENT':
      return hasFetchError(state, action);
    case 'RESET_SINGLE_APARTMENT':
      return action.data;
    default:
      return state;
  }
};

export default singleApartmentReducer;
