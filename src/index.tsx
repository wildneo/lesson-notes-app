import React from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import DateFnsUtils from '@date-io/date-fns';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import App from './App';
import defaultTheme from './themes/defaultTheme';

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={defaultTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
