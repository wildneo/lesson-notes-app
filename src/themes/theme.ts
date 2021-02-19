import { ThemeOptions } from '@material-ui/core/styles';

const lightTheme: ThemeOptions = {
  overrides: {
    MuiCssBaseline: {
      '@global': {
        'html, body, #root': {
          height: '100%',
        },
      },
    },
  },
  palette: {
    type: 'light',
  },
};

const darkTheme: ThemeOptions = {
  ...lightTheme,
  overrides: {
    ...lightTheme.overrides,
  },
  palette: {
    type: 'dark',
  },
};

export default (darkMode: boolean) => (darkMode ? darkTheme : lightTheme);
