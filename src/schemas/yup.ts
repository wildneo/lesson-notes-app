import * as yup from 'yup';

yup.setLocale({
  mixed: {
    notType: () => 'Wrong Format',
    required: () => 'Required Field',
  },
  string: {
    matches: () => 'Wrong Value',
  },
});

export default yup;
