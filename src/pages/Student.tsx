import React from 'react';

import LessonsList from '../components/LessonsList';
import NewLessonDialog from '../components/NewLessonDialog';

const Student = () => (
  <>
    <LessonsList />
    <NewLessonDialog />
  </>
);

export default React.memo(Student);
