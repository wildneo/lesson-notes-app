import React, { useEffect } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import { LessonFormValues, Student } from '../hooks/useDatabase';
import { AnyObjectSchema } from '../schemas/yup';
import DatePicker from './fields/DatePicker';
import TextField from './fields/TextField';

export interface StudentFormProps {
  schema: AnyObjectSchema;
  isLoading: boolean;
  defaultValues: LessonFormValues;
  student: Student;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (values: LessonFormValues) => void;
  onCancel: () => void;
}

const StudentForm = (props: StudentFormProps) => {
  const {
    schema,
    student,
    defaultValues,
    isLoading = false,
    onSubmit,
    onCancel,
  } = props;
  const methods = useForm<LessonFormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    formState, errors, handleSubmit, reset,
  } = methods;

  const isSubmitted = formState.isSubmitSuccessful;

  useEffect(() => {
    if (isSubmitted) reset();
  }, [isSubmitted, reset]);

  return (
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
        <Button onClick={onCancel} disabled={isSubmitted} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitted}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </FormProvider>
  );
};

export default React.memo(StudentForm);
