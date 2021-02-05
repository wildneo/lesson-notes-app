import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import Container from './Container';

const useStyles = makeStyles(
  createStyles({
    root: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);

const Loading = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <CircularProgress />
    </Container>
  );
};

export default React.memo(Loading);
