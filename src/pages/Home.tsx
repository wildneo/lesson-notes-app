import React from 'react';

import AddStudentDialog from '../components/features/students/AddStudentDialog';
import StudentsList from '../components/features/students/StudentsList';

const Home = () => (
  <>
    <StudentsList />
    <AddStudentDialog />
  </>
);

export default React.memo(Home);
