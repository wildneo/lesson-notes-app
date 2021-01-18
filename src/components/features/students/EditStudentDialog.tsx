import React, { useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import EditIcon from '@material-ui/icons/Edit';

import useDatabase, { Student } from '../../../hooks/useDatabase';
import schema from '../../../schemas/newStudent';
import { RequestStatus } from '../../../typings';
import { pickUpdatedFields } from '../../../utils';
import StudentForm, { StudentFormProps } from '../../StudentForm';

export interface UpdateStudentDialogProps {
  student: Student;
}

const UpdateStudentDialog = ({ student }: UpdateStudentDialogProps) => {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('none');
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { updateStudent } = useDatabase();
  const defaultValues = {
    firstName: student.firstName,
    lastName: student.lastName,
  };

  const isLoading = requestStatus === 'requested';

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateStudent: StudentFormProps['onSubmit'] = async (
    values,
    dirtyFields,
  ) => {
    setRequestStatus('requested');
    try {
      // console.log(values, dirtyFields);
      const updatedFields = pickUpdatedFields(values, dirtyFields);
      await updateStudent(student.id, updatedFields);
      setRequestStatus('finished');
      setOpen(false);
    } catch (error) {
      setRequestStatus('failed');
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        onClose={handleClose}
        fullScreen={fullScreen}
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        open={open}
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
    </>
  );
};

export default React.memo(UpdateStudentDialog);
