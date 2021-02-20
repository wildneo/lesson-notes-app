import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    // debug: true,
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru'],
    ns: ['common', 'validations', 'actions'],
    defaultNS: 'common',
    react: {
      useSuspense: false,
    },
  });

export default i18n;
