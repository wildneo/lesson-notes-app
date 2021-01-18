import React from 'react';

import AddLessonDialog from '../components/features/lessons/AddLessonDialog';
import LessonsList from '../components/features/lessons/LessonsList';

const Student = () => (
  <>
    <LessonsList />
    <AddLessonDialog />
  </>
);

export default React.memo(Student);
