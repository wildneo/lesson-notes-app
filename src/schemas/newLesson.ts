import yup from './yup';

const regExpLessonNumber = /^[0-9]\/[0-9]$/;
const regExpNewWords = /^[a-zA-Z -\s,]+$/;

export default yup.object().shape({
  date: yup.date()
    .required(),
  lessonNumber: yup.string()
    .required()
    .trim()
    .matches(regExpLessonNumber),
  lessonPlan: yup.string()
    .required(),
  homework: yup.string(),
  comment: yup.string(),
  newWords: yup.string()
    .trim()
    .matches(regExpNewWords, { excludeEmptyString: true }),
});
