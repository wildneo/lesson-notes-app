import React, { useState, useEffect } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AddIcon from '@material-ui/icons/Add';

import useDatabase, { StudentFormValues } from '../hooks/useDatabase';
import schema from '../schemas/newStudent';
import { RequestStatus } from '../typings';
import TextField from './fields/TextField';

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
  const methods = useForm<StudentFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });

  const {
    formState, errors, handleSubmit, reset,
  } = methods;
  const isLoading = requestStatus === 'requested';
  const isSubmitted = formState.isSubmitSuccessful;

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

  useEffect(() => {
    if (isSubmitted) reset();
  }, [isSubmitted, reset]);

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
        disableBackdropClick={isSubmitted}
        disableEscapeKeyDown={isSubmitted}
        maxWidth="xs"
        open={open}
      >
        <FormProvider {...methods}>
          <DialogTitle>Add new student</DialogTitle>
          {isLoading && <LinearProgress />}
          <DialogContent dividers>
            <Grid
              container
              spacing={2}
              component="form"
              autoComplete="off"
              noValidate
            >
              <Grid item xs={12}>
                <TextField
                  name="firstName"
                  label="First name"
                  variant="outlined"
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName?.message ?? ' '}
                  disabled={isSubmitted}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="lastName"
                  label="Last name"
                  variant="outlined"
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName?.message ?? ' '}
                  disabled={isSubmitted}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              disabled={isSubmitted}
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(handleAddStudent)}
              disabled={isSubmitted}
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
};

export default React.memo(NewStudentDialog);
