import React from 'react';

import { Redirect } from 'react-router-dom';

import LoginForm from '../components/LoginForm';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { auth } = useAuth();

  return auth.currentUser ? <Redirect to="/" /> : <LoginForm />;
};

export default React.memo(Login);
