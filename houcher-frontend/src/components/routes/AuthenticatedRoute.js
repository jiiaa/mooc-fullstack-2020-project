import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthenticatedRoute = ({ children, ...rest }) => {
  const { pathname, search } = useLocation();
  const isLoggedIn = useSelector((state) => state.loginReducer);

  return (
    <Route {...rest}>
      {isLoggedIn ? (
        children
      ) : (
        <Redirect to={`/login?redirect=${pathname}${search}`} />
      )}
    </Route>
  );
};

export default AuthenticatedRoute;
