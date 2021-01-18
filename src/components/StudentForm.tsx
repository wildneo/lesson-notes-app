import React, { useEffect } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import { StudentFormValues } from '../hooks/useDatabase';
import { AnyObjectSchema } from '../schemas/yup';
import TextField from './fields/TextField';

export interface StudentFormProps {
  schema: AnyObjectSchema;
  isLoading: boolean;
  defaultValues: StudentFormValues;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (values: StudentFormValues) => void;
  onCancel: () => void;
}

const StudentForm = (props: StudentFormProps) => {
  const {
    schema,
    defaultValues,
    isLoading = false,
    onSubmit,
    onCancel,
  } = props;
  const methods = useForm<StudentFormValues>({
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
          onClick={onCancel}
          disabled={isSubmitted}
          color="secondary"
        >
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
