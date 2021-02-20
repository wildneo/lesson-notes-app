import React from 'react';

import { FormProvider, useForm, FormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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
    values: StudentFormValues,
    dirtyFields: FormState<StudentFormValues>['dirtyFields'],
  ) => void;
  onCancel: () => void;
}

const StudentForm = (props: StudentFormProps) => {
  const { t } = useTranslation();
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

  const { formState, errors, handleSubmit } = methods;

  const { dirtyFields, isSubmitSuccessful, isDirty } = formState;

  const submitAdapter = (values: StudentFormValues) => {
    onSubmit(values, dirtyFields);
  };

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
              label={t('studentForm.labels.firstName')}
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
              label={t('studentForm.labels.lastName')}
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
          {t('studentForm.actions.cancel')}
        </Button>
        <Button
          onClick={handleSubmit(submitAdapter)}
          disabled={isSubmitSuccessful || !isDirty}
          color="primary"
        >
          {t('studentForm.actions.save')}
        </Button>
      </DialogActions>
    </FormProvider>
  );
};

export default React.memo(StudentForm);
