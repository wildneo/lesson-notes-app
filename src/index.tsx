import React from 'react';

import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import App from './App';
import i18n from './i18n';
import ThemeProvider from './themes/ThemeProvider';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <ThemeProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <App />
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </BrowserRouter>
      </I18nextProvider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
