import React from 'react';

import { Route, Redirect, RouteProps } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

export interface ProtectedRouteProps {
  redirectTo: string;
}

const ProtectedRoute = (props: ProtectedRouteProps & RouteProps) => {
  const { redirectTo, ...restProps } = props;
  const { auth } = useAuth();

  const isAuth = auth.currentUser !== null;

  return isAuth ? (
    <Route {...restProps} />
  ) : (
    <Redirect to={{ pathname: redirectTo }} />
  );
};

export default React.memo(ProtectedRoute);
