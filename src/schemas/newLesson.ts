import yup from './yup';

const regExp = /^[0-9]\/[0-9]/;

export default yup.object().shape({
  date: yup.date()
    .required(),
  lessonNumber: yup.string()
    .required()
    .trim()
    .matches(regExp),
  lessonPlan: yup.string()
    .required(),
  homework: yup.string(),
  comment: yup.string(),
  newWords: yup.string()
    .trim(),
});
