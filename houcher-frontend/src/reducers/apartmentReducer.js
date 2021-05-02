import apartmentService from '../services/apartments';

const startFetching = (state) => ({
  ...state,
  isFetching: true,
});

const fetchSuccess = (state, action) => ({
  ...state,
  isFetching: false,
  apartments: action.data,
});

const hasFetchError = (state, action) => ({
  ...state,
  hasFetchError: true,
  isFetching: false,
  errorMessage: action.data.message,
});

export const createApartment = (newApartment) => {
  return async (dispatch) => {
    dispatch({
      type: 'CREATE_APARTMENT',
      data: newApartment,
    });
  };
};

export const initializeApartments = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'FETCH_APARTMENTS',
      });
      const response = await apartmentService.getAll();
      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: 'FETCH_APARTMENTS_SUCCESS',
          data: response.data,
        });
      }
    } catch (exception) {
      dispatch({
        type: 'HAS_FETCH_ERROR_APARTMENTS',
        data: exception,
      });
    }
  };
};

export const resetApartments = () => {
  return {
    type: 'RESET_APARTMENTS',
    data: {
      apartments: [],
      isFetching: false,
      hasFetchError: false,
      errorMessage: null,
    }
  };
};

const apartmentReducer = (
  state = {
    apartments: [],
    isFetching: false,
    hasFetchError: false,
    errorMessage: null,
  },
  action
) => {
  switch (action.type) {
    case 'FETCH_APARTMENTS':
      return startFetching(state);
    case 'FETCH_APARTMENTS_SUCCESS':
      return fetchSuccess(state, action);
    case 'HAS_FETCH_ERROR_APARTMENTS':
      return hasFetchError(state, action);
    case 'CREATE_APARTMENT':
      return state.apartments.concat(action.data);
    case 'RESET_APARTMENTS':
      return action.data;
    default:
      return state;
  }
};

export default apartmentReducer;
