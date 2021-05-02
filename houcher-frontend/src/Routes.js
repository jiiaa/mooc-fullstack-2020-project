import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './components/publicView/Landing';
import AuthenticatedRoute from './components/routes/AuthenticatedRoute';
import Home from './components/common/Home';
import ApartmentForm from './components/apartment/ApartmentForm';
import SingleApartment from './components/apartment/SingleApartment';
import SignInForm from './components/publicView/SignInForm';
import LoginForm from './components/publicView/LoginForm';
import MyFans from './components/user/MyFans';
import MyLikes from './components/user/MyLikes';
import UserProfile from './components/user/UserProfile';
import UnauthenticatedRoute from './components/routes/UnAuthenticatedRoute';

export default () => (
  <Switch>
    <UnauthenticatedRoute exact path="/signin">
      <SignInForm />
    </UnauthenticatedRoute>
    <UnauthenticatedRoute exact path="/login">
      <LoginForm />
    </UnauthenticatedRoute>
    <AuthenticatedRoute exact path="/home">
      <Home />
    </AuthenticatedRoute>
    <AuthenticatedRoute exact path="/home/:id">
      <SingleApartment />
    </AuthenticatedRoute>
    <AuthenticatedRoute exact path="/create">
      <ApartmentForm />
    </AuthenticatedRoute>
    <AuthenticatedRoute exact path="/myfans">
      <MyFans />
    </AuthenticatedRoute>
    <AuthenticatedRoute exact path="/userlikes">
      <MyLikes />
    </AuthenticatedRoute>
    <AuthenticatedRoute exact path="/user">
      <UserProfile />
    </AuthenticatedRoute>
    <Route path="/">
      <Landing />
    </Route>
  </Switch>
);
