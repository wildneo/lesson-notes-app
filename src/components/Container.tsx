import React from 'react';

import MUIContainer, { ContainerProps } from '@material-ui/core/Container';

const Container = React.forwardRef<any, ContainerProps>((props, ref) => (
  <MUIContainer disableGutters maxWidth="sm" ref={ref} {...props} />
));

export default React.memo(Container);
