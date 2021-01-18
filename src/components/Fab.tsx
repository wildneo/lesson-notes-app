import React from 'react';

import MUIFab from '@material-ui/core/Fab';
import { styled } from '@material-ui/core/styles';

const Fab = styled(MUIFab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

export default React.memo(Fab);
