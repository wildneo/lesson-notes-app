import React, { useState } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import useDatabase, {
  LessonFormValues,
  Lesson,
  Student,
} from '../../../hooks/useDatabase';
import schema from '../../../schemas/newLesson';
import { RequestStatus } from '../../../typings';
import { pickUpdatedFields } from '../../../utils';
import LessonForm, { LessonFormProps } from '../../LessonForm';

const EditLessonDialog = () => {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('none');
  const history = useHistory();
  const { state } = useLocation<{
    student: Student;
    lesson: Lesson;
  }>();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { updateLesson } = useDatabase();

  const isLoading = requestStatus === 'requested';

  const defaultValues: LessonFormValues = {
    date: state.lesson.date,
    lessonNumber: state.lesson.lessonNumber,
    lessonPlan: state.lesson.lessonPlan,
    homework: state.lesson.homework,
    comment: state.lesson.comment,
    newWords: state.lesson.newWords.join(','),
  };

  const handleClose = () => {
    history.goBack();
  };

  const handleUpdateLesson: LessonFormProps['onSubmit'] = async (
    values,
    dirtyFields,
  ) => {
    setRequestStatus('requested');
    try {
      const updatedFields = pickUpdatedFields(values, dirtyFields);
      await updateLesson(state.student.id, state.lesson.id, updatedFields);
      setRequestStatus('finished');
    } catch (error) {
      setRequestStatus('failed');
    }
    history.goBack();
  };

  return (
    <Dialog
      onClose={handleClose}
      fullScreen={fullScreen}
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      open
    >
      <DialogTitle>Edit lesson</DialogTitle>
      <LessonForm
        defaultValues={defaultValues}
        isLoading={isLoading}
        schema={schema}
        onSubmit={handleUpdateLesson}
        onCancel={handleClose}
      />
    </Dialog>
  );
};

export default React.memo(EditLessonDialog);
