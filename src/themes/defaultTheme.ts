import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        'html, body, #root': {
          height: '100%',
        },
      },
    },
  },
  // palette: {
  //   type: 'dark',
  //   primary: {
  //     dark: blueGrey[900],
  //     main: blueGrey[500],
  //     light: blueGrey[200],
  //   },
  //   secondary: {
  //     dark: deepOrange[900],
  //     main: deepOrange[500],
  //     light: deepOrange[200],
  //   },
  // },
});

export default theme;
