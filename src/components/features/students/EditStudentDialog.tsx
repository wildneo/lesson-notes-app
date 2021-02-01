import React, { useState } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import useDatabase, { Student } from '../../../hooks/useDatabase';
import schema from '../../../schemas/newStudent';
import { RequestStatus } from '../../../typings';
import { pickUpdatedFields } from '../../../utils';
import StudentForm, { StudentFormProps } from '../../StudentForm';

export interface EditStudentDialogProps {
  student: Student;
}

const EditStudentDialog = () => {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('none');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { updateStudent } = useDatabase();
  const { state } = useLocation<{ student: Student }>();
  const history = useHistory();

  const defaultValues = {
    firstName: state.student.firstName,
    lastName: state.student.lastName,
  };

  const isLoading = requestStatus === 'requested';

  const handleClose = () => {
    history.goBack();
  };

  const handleUpdateStudent: StudentFormProps['onSubmit'] = async (
    values,
    dirtyFields,
  ) => {
    setRequestStatus('requested');
    try {
      const updatedFields = pickUpdatedFields(values, dirtyFields);
      await updateStudent(state.student.id, updatedFields);
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
      <DialogTitle>Edit student</DialogTitle>
      <StudentForm
        defaultValues={defaultValues}
        isLoading={isLoading}
        schema={schema}
        onSubmit={handleUpdateStudent}
        onCancel={handleClose}
      />
    </Dialog>
  );
};

export default React.memo(EditStudentDialog);
