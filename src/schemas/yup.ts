import * as yup from 'yup';

import i18n from '../i18n';

export type { AnyObjectSchema } from 'yup';

yup.setLocale({
  mixed: {
    notType: () => i18n.t('validations:wrongFormat'),
    required: () => i18n.t('validations:required'),
  },
  string: {
    matches: () => i18n.t('validations:wrongValue'),
  },
});

export default yup;
