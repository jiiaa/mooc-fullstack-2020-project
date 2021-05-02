import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const getQueryString = (name, url = window.location.href) => {
  name = name.replace(/[[]]/g, '\\$&');

  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i');
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

const UnauthenticatedRoute = ({ children, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.loginReducer);
  const redirect = getQueryString('redirect');

  return (
    <Route {...rest}>
      {!isLoggedIn ? (
        children
      ) : (
        <Redirect
          to={redirect === '' || redirect === null ? '/home' : redirect}
        />
      )}
    </Route>
  );
};

export default UnauthenticatedRoute;
