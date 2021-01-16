import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Toolbar from '@material-ui/core/Toolbar';

import AppBar from './components/AppBar';
import useAuth from './hooks/useAuth';
import NoMatch from './pages/404';
import Home from './pages/Home';
import Login from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';
import Student from './pages/Student';

const App = () => {
  const [ready, setReady] = React.useState(false);
  const { auth } = useAuth();

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      if (ready) return;
      setReady(true);
    });

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ready ? (
    <Box
      display="flex"
      flexDirection="column"
      height="inherit"
    >
      <AppBar />
      <Toolbar />
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          redirectTo="/login"
          component={Home}
        />
        <ProtectedRoute
          path="/students/:id"
          redirectTo="/login"
          component={Student}
        />
        <Route path="/login" component={Login} />
        <Route path="/404" component={NoMatch} />
        <Redirect to="/404" />
      </Switch>
    </Box>
  ) : (
    <LinearProgress />
  );
};

export default React.memo(App);
