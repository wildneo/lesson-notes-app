import React from 'react';

import MUIPaper, { PaperProps } from '@material-ui/core/Paper';
import { styled } from '@material-ui/core/styles';

const Paper = styled(
  React.forwardRef<HTMLDivElement, PaperProps>((props, ref) => (
    <MUIPaper variant="outlined" square ref={ref} {...props} />
  )),
)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export default React.memo(Paper);
