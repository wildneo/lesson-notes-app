import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AddIcon from '@material-ui/icons/Add';

import useDatabase, {
  LessonFormValues,
  Student,
} from '../../../hooks/useDatabase';
import schema from '../../../schemas/newLesson';
import { RequestStatus } from '../../../typings';
import Fab from '../../Fab';
import LessonForm from '../../LessonForm';

const NewStudentDialog = () => {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('none');
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { addLesson } = useDatabase();
  const {
    state: { student },
  } = useLocation<{ student: Student }>();

  const defaultValues = {
    date: new Date(),
    lessonNumber: '',
    lessonPlan: '',
    homework: '',
    comment: '',
    newWords: '',
  };

  const isLoading = requestStatus === 'requested';

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddStudent = async (values: LessonFormValues) => {
    setRequestStatus('requested');
    try {
      await addLesson(student.id, values);
      setRequestStatus('finished');
    } catch (error) {
      setRequestStatus('failed');
    }
    setOpen(false);
  };

  return (
    <>
      <Fab onClick={handleOpen} color="primary">
        <AddIcon />
      </Fab>
      <Dialog
        onClose={handleClose}
        fullScreen={fullScreen}
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        open={open}
      >
        <DialogTitle>Add new lesson</DialogTitle>
        <LessonForm
          defaultValues={defaultValues}
          isLoading={isLoading}
          schema={schema}
          onSubmit={handleAddStudent}
          onCancel={handleClose}
        />
      </Dialog>
    </>
  );
};

export default React.memo(NewStudentDialog);
