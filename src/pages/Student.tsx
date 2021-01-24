import React from 'react';

import CotextMenuProvider from '../components/CotextMenuProvider';
import AddLessonDialog from '../components/features/lessons/AddLessonDialog';
import EditLessonDialog from '../components/features/lessons/EditLessonDialog';
import LessonContextMenu from '../components/features/lessons/LessonContextMenu';
import LessonsList from '../components/features/lessons/LessonsList';

const Student = () => (
  <CotextMenuProvider>
    <LessonsList />
    <AddLessonDialog />
    <EditLessonDialog />
    <LessonContextMenu />
  </CotextMenuProvider>
);

export default React.memo(Student);
