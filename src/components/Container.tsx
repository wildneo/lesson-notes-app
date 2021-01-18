import React from 'react';

import MUIContainer, { ContainerProps } from '@material-ui/core/Container';
import { styled } from '@material-ui/core/styles';

const Container = styled(
  React.forwardRef<any, ContainerProps>((props, ref) => (
    <MUIContainer disableGutters maxWidth="sm" ref={ref} {...props} />
  )),
)({
  display: 'flex',
  flexGrow: 1,
});

export default React.memo(Container);
