import React from 'react';

import { useCookies } from 'react-cookie';

import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
  useMediaQuery,
} from '@material-ui/core';

import { ThemeContext } from '../hooks/useThemeProvider';
import defaultTheme from './theme';

const ThemeProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [cookies, setCookie] = useCookies(['darkMode']);
  const [darkMode, setDarkMode] = React.useState<boolean>(
    JSON.parse(cookies.darkMode) ?? prefersDarkMode,
  );
  const theme = React.useMemo(() => createMuiTheme(defaultTheme(darkMode)), [
    darkMode,
  ]);

  React.useEffect(() => {
    setCookie('darkMode', darkMode);
  }, [darkMode, setCookie]);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode,
      }}
    >
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default React.memo(ThemeProvider);
