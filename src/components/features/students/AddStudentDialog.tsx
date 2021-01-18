import React, { useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AddIcon from '@material-ui/icons/Add';

import useDatabase, { StudentFormValues } from '../../../hooks/useDatabase';
import schema from '../../../schemas/newStudent';
import { RequestStatus } from '../../../typings';
import StudentForm from '../../StudentForm';

const useStyles = makeStyles((theme: Theme) => createStyles({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const NewStudentDialog = () => {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('none');
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const classes = useStyles();
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
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <>
      <Fab
        onClick={handleOpen}
        className={classes.fab}
        color="primary"
      >
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
