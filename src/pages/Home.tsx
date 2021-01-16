import React from 'react';

import NewStudentDialog from '../components/NewStudentDialog';
import StudentsList from '../components/StudentsList';

const Home = () => (
  <>
    <StudentsList />
    <NewStudentDialog />
  </>
);

export default React.memo(Home);
