import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import loginReducer from './reducers/loginReducer';
import userReducer from './reducers/userReducer';
import myLikesReducer from './reducers/myLikesReducer';
import myFansReducer from './reducers/myFansReducer';
import myApartmentReducer from './reducers/myApartmentReducer';
import newLikesReducer from './reducers/newLikesReducer';
import notificationReducer from './reducers/notificationReducer';
import apartmentReducer from './reducers/apartmentReducer';
import singleApartmentReducer from './reducers/singleApartmentReducer';
import viewReducer from './reducers/viewReducer';
import loaderReducer from './reducers/loaderReducer';

const reducer = combineReducers({
  loginReducer,
  userReducer,
  myLikesReducer,
  myFansReducer,
  myApartmentReducer,
  newLikesReducer,
  notificationReducer,
  apartmentReducer,
  singleApartmentReducer,
  viewReducer,
  loaderReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
