import { isAfter, isToday } from 'date-fns';

const today = new Date();

const getClassNameByDay = (date: Date) => {
  switch (true) {
    case isToday(date):
      return 'today';
    case isAfter(today, date):
      return 'after';
    default:
      return 'before';
  }
};

export default getClassNameByDay;
