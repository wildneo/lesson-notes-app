import React, { useEffect } from 'react';

import { FormProvider, useForm, FormState } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import { LessonFormValues } from '../hooks/useDatabase';
import { AnyObjectSchema } from '../schemas/yup';
import DatePicker from './fields/DatePicker';
import TextField from './fields/TextField';

export interface LessonFormProps {
  schema: AnyObjectSchema;
  isLoading: boolean;
  defaultValues: LessonFormValues;
  onSubmit: (
    // eslint-disable-next-line no-unused-vars
    values: LessonFormValues,
    // eslint-disable-next-line no-unused-vars
    dirtyFields: FormState<LessonFormValues>['dirtyFields'],
  ) => void;
  onCancel: () => void;
}

const StudentForm = (props: LessonFormProps) => {
  const {
    schema,
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

  const { dirtyFields, isSubmitSuccessful, isDirty } = formState;

  const adapter = (values: LessonFormValues) => {
    onSubmit(values, dirtyFields);
  };

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <FormProvider {...methods}>
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
              disabled={isSubmitSuccessful}
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
              disabled={isSubmitSuccessful}
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
              disabled={isSubmitSuccessful}
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
              disabled={isSubmitSuccessful}
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
              disabled={isSubmitSuccessful}
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
              disabled={isSubmitSuccessful}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onCancel}
          disabled={isSubmitSuccessful}
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(adapter)}
          disabled={isSubmitSuccessful || !isDirty}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </FormProvider>
  );
};

export default React.memo(StudentForm);
