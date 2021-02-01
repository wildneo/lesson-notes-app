import React, { useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AddIcon from '@material-ui/icons/Add';

import useDatabase, { StudentFormValues } from '../../../hooks/useDatabase';
import schema from '../../../schemas/newStudent';
import { RequestStatus } from '../../../typings';
import Fab from '../../Fab';
import StudentForm from '../../StudentForm';

const NewStudentDialog = () => {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('none');
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { addStudent } = useDatabase();
  const defaultValues = {
    firstName: '',
    lastName: '',
  };

  const isLoading = requestStatus === 'requested';

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddStudent = async (values: StudentFormValues) => {
    setRequestStatus('requested');
    try {
      await addStudent(values);
      setRequestStatus('finished');
      setOpen(false);
    } catch (error) {
      setRequestStatus('failed');
    }
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
        <DialogTitle>Add new student</DialogTitle>
        <StudentForm
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
