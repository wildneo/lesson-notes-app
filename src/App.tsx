import React from 'react';

import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';

import AppBar from './components/AppBar';
import EditLessonDialog from './components/features/lessons/EditLessonDialog';
import EditStudentDialog from './components/features/students/EditStudentDialog';
import Loading from './components/Loading';
import useAuth from './hooks/useAuth';
import useDatabase, { Student as IStudent } from './hooks/useDatabase';
import NoMatch from './pages/404';
import Home from './pages/Home';
import Login from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';
import Student from './pages/Student';

const App = () => {
  const [ready, setReady] = React.useState(false);
  const [defaultStudents, setStudents] = React.useState<IStudent[]>([]);
  const { auth } = useAuth();
  const { getStudentsOnce } = useDatabase();
  const location = useLocation<{
    background: ReturnType<typeof useLocation>;
  }>();
  const background = location.state?.background;

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const students = await getStudentsOnce();
        await setStudents(students);
        setReady(true);
      } else {
        setReady(true);
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ready ? (
    <Box display="flex" flexDirection="column" height="inherit">
      <AppBar />
      <Toolbar />
      <Switch location={background || location}>
        <ProtectedRoute exact path="/" redirectTo="/login">
          <Home defaultStudents={defaultStudents} />
        </ProtectedRoute>
        <ProtectedRoute
          exact
          path="/students/:id"
          redirectTo="/login"
          component={Student}
        />
        <Route path="/login" component={Login} />
        <Route path="/404" component={NoMatch} />
        <Redirect to="/404" />
      </Switch>
      {background && (
        <>
          <Route path="/students/edit/:id" component={EditStudentDialog} />
          <Route path="/lessons/edit/:id" component={EditLessonDialog} />
        </>
      )}
    </Box>
  ) : (
    <Loading />
  );
};

export default React.memo(App);
