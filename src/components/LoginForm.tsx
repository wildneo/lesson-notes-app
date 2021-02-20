import React, { useState, useEffect } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useAuth from '../hooks/useAuth';
import schema from '../schemas/user';
import { RequestStatus } from '../typings';
import TextField from './fields/TextField';

export interface UserFormValues {
  email: string;
  password: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
    width: '100%',
  },
}));

const LoginForm = () => {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('none');
  const { t } = useTranslation();
  const history = useHistory();
  const { auth } = useAuth();
  const classes = useStyles();

  const methods = useForm<UserFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { formState, errors, handleSubmit, setError, reset } = methods;

  const isLoading = requestStatus === 'requested';
  const { isSubmitSuccessful, isDirty } = formState;

  const handleLogIn = async ({ email, password }: UserFormValues) => {
    setRequestStatus('requested');
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setRequestStatus('finished');
      history.push('/');
    } catch (error) {
      setRequestStatus('failed');

      switch (error.code) {
        case 'auth/user-not-found':
          setError('email', {
            type: error.code,
            message: error.message,
          });
          break;

        case 'auth/wrong-password':
          setError('password', {
            type: error.code,
            message: error.message,
          });
          break;

        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <Container disableGutters maxWidth="xs">
      <FormProvider {...methods}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('loginForm.title', t('actions:signin'))}
          </Typography>
          {isLoading && <LinearProgress />}
          <Grid
            className={classes.form}
            container
            spacing={2}
            component="form"
            noValidate
          >
            <Grid item xs={12}>
              <TextField
                name="email"
                label={t('loginForm.labels.email')}
                variant="outlined"
                error={Boolean(errors.email)}
                helperText={errors.email?.message ?? ' '}
                disabled={isSubmitSuccessful}
                type="email"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label={t('loginForm.labels.password')}
                variant="outlined"
                error={Boolean(errors.password)}
                helperText={errors.password?.message ?? ' '}
                disabled={isSubmitSuccessful}
                type="password"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={handleSubmit(handleLogIn)}
                disabled={isSubmitSuccessful || !isDirty}
                color="primary"
                fullWidth
              >
                {t('loginForm.actions.signin')}
              </Button>
            </Grid>
          </Grid>
        </div>
      </FormProvider>
    </Container>
  );
};

export default React.memo(LoginForm);
