import React from 'react';

import AddStudentDialog from '../components/features/students/AddStudentDialog';
import StudentsList, {
  StudentsListProps,
} from '../components/features/students/StudentsList';

const Home = ({ defaultStudents }: StudentsListProps) => (
  <>
    <StudentsList defaultStudents={defaultStudents} />
    <AddStudentDialog />
  </>
);

export default React.memo(Home);
