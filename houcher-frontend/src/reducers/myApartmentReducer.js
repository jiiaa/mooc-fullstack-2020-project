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

export const fetchMyApartment = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'FETCH_MY_APARTMENT',
      });
      const response = await apartmentService.getMyApartment(id);
      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: 'FETCH_MY_APARTMENT_SUCCESS',
          data: response.data,
        });
      }
    } catch (exception) {
      dispatch({
        type: 'HAS_FETCH_ERROR_MY_APARTMENT',
        data: exception,
      });
    }
  };
};

export const setMyApartment = (apartment) => {
  return {
    type: 'SET_APARTMENT',
    data: apartment,
  };
};

export const resetMyApartment = () => {
  return {
    type: 'RESET_MY_APARTMENT',
    data: {
      apartment: {},
      isFetching: false,
      hasFetchError: false,
      errorMessage: null,
    }
  };
};

const myApartmentReducer = (
  state = {
    apartment: {},
    isFetching: false,
    hasFetchError: false,
    errorMessage: null,
  },
  action
) => {
  switch (action.type) {
    case 'SET_APARTMENT':
      return { ...state, apartment: action.data };
    case 'FETCH_MY_APARTMENT':
      return startFetching(state);
    case 'FETCH_MY_APARTMENT_SUCCESS':
      return fetchSuccess(state, action);
    case 'HAS_FETCH_ERROR_MY_APARTMENT':
      return hasFetchError(state, action);
    case 'RESET_MY_APARTMENT':
      return action.data;
    default:
      return state;
  }
};

export default myApartmentReducer;
