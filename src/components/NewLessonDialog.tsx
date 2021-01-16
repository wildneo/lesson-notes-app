import React, { useState, useEffect } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

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

import useDatabase, { LessonFormValues, Student } from '../hooks/useDatabase';
import schema from '../schemas/newLesson';
import { RequestStatus } from '../typings';
import DatePicker from './fields/DatePicker';
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
  const { addLesson } = useDatabase();
  const { state: { student } } = useLocation<{ student: Student }>();
  const methods = useForm<LessonFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      date: new Date(),
      lessonNumber: '',
      lessonPlan: '',
      homework: '',
      comment: '',
      newWords: '',
    },
  });

  const {
    formState,
    errors,
    handleSubmit,
    reset,
  } = methods;
  const isLoading = requestStatus === 'requested';
  const isSubmitted = formState.isSubmitSuccessful;

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
          <DialogTitle>
            Add new lesson for
            {student.firstName}
          </DialogTitle>
          {isLoading && <LinearProgress />}
          <DialogContent dividers>
            <Grid
              container
              spacing={2}
              component="form"
              autoComplete="off"
              noValidate
            >
              <Grid item xs={8}>
                <DatePicker
                  name="date"
                  label="Date"
                  variant="outlined"
                  pickerVariant="inline"
                  error={Boolean(errors.date)}
                  helperText={errors.date?.message ?? ' '}
                  disabled={isSubmitted}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="lessonNumber"
                  label="Lesson"
                  variant="outlined"
                  error={Boolean(errors.lessonNumber)}
                  helperText={errors.lessonNumber?.message ?? ' '}
                  disabled={isSubmitted}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="lessonPlan"
                  label="Lesson Plan"
                  variant="outlined"
                  multiline
                  rowsMax={4}
                  error={Boolean(errors.lessonPlan)}
                  helperText={errors.lessonPlan?.message ?? ' '}
                  disabled={isSubmitted}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="homework"
                  label="Homework"
                  variant="outlined"
                  multiline
                  rowsMax={6}
                  error={Boolean(errors.homework)}
                  helperText={errors.homework?.message ?? ' '}
                  disabled={isSubmitted}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="comment"
                  label="Comment"
                  variant="outlined"
                  multiline
                  rowsMax={6}
                  error={Boolean(errors.comment)}
                  helperText={errors.comment?.message ?? ' '}
                  disabled={isSubmitted}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="newWords"
                  label="New words"
                  variant="outlined"
                  multiline
                  rowsMax={2}
                  error={Boolean(errors.newWords)}
                  helperText={errors.newWords?.message ?? ' '}
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
