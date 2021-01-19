import React, { useEffect } from 'react';

import { FormProvider, useForm, FormState } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import { StudentFormValues } from '../hooks/useDatabase';
import { AnyObjectSchema } from '../schemas/yup';
import TextField from './fields/TextField';

export interface StudentFormProps {
  schema: AnyObjectSchema;
  isLoading: boolean;
  defaultValues: StudentFormValues;
  onSubmit: (
    // eslint-disable-next-line no-unused-vars
    values: StudentFormValues,
    // eslint-disable-next-line no-unused-vars
    dirtyFields: FormState<StudentFormValues>['dirtyFields'],
  ) => void;
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

  const { formState, errors, handleSubmit, reset } = methods;

  const { dirtyFields, isSubmitSuccessful, isDirty } = formState;

  const adapter = (values: StudentFormValues) => {
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
          <Grid item xs={12}>
            <TextField
              name="firstName"
              label="First name"
              variant="outlined"
              error={Boolean(errors.firstName)}
              helperText={errors.firstName?.message ?? ' '}
              disabled={isSubmitSuccessful}
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
      {/* {JSON.stringify(formState.dirtyFields, null, 2)} */}
    </FormProvider>
  );
};

export default React.memo(StudentForm);
