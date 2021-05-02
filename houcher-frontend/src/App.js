import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Routes from './Routes';
import Loader from './components/common/Loader';
import Notification from './components/common/Notification';
import ApplBar from './components/common/ApplBar';
import Footer from './components/common/Footer';
import { userLogin } from './reducers/loginReducer';
import { setUser } from './reducers/userReducer';
import { fetchMyApartment } from './reducers/myApartmentReducer';
import userService from './services/user';
import apartmentservice from './services/apartments';
import storage from './utils/storage';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffa4a2',
      main: '#e57373',
      dark: '#af4448',
      contrastText: '#000000',
    },
    secondary: {
      light: '#8eacbc',
      main: '#607d8c',
      dark: '#34515f',
      contrastText: '#000000',
    },
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUserData(id) {
      const response = await userService.getUser(id);
      const user = response.data;
      apartmentservice.setToken(loggedInUser.token);
      dispatch(fetchMyApartment(user.myHome));
      dispatch(userLogin());
      dispatch(setUser(user));
    }

    const loggedInUser = storage.getUser();
    const timeNow = Date.now();

    if (loggedInUser && loggedInUser.expireTime > timeNow) {
      getUserData(loggedInUser.id);
    } else {
      storage.logoutUser();
    }
  }, [dispatch]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Loader />
      <Notification />
      <ApplBar />
      <Routes />
      <Footer />
    </MuiThemeProvider>
  );
}

export default withRouter(App);
