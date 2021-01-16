import yup from './yup';

const regExp = /^[а-яА-ЯёЁa-zA-Z0-9_-\s"«»]+$/;

export default yup.object().shape({
  firstName: yup.string()
    .required()
    .min(2)
    .trim()
    .matches(regExp),
  lastName: yup.string()
    .trim()
    .matches(regExp, { excludeEmptyString: true }),
});
