import firebase from 'firebase/app';

import { auth, db } from '../firebase';
import { wordsToArray } from '../utils';

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt: Date;
}

export interface StudentDoc {
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt: firebase.firestore.Timestamp;
}

export type StudentFormValues = Pick<Student, 'firstName' | 'lastName'>;

export interface Lesson {
  id: string;
  date: Date;
  lessonNumber: string;
  lessonPlan: string;
  homework: string;
  comment: string;
  newWords: string[];
  createdAt: Date;
}

export interface LessonDoc {
  date: firebase.firestore.Timestamp;
  lessonNumber: string;
  lessonPlan: string;
  homework: string;
  comment: string;
  newWords: string[];
  createdAt: firebase.firestore.Timestamp;
}

export interface LessonFormValues
  extends Omit<Lesson, 'id' | 'createdAt' | 'teacherUID' | 'newWords'> {
  newWords: string;
}

// eslint-disable-next-line no-unused-vars
type onChangeCallback<T> = (data: T) => void;

const useDatabase = () => {
  const addStudent = async (student: StudentFormValues) => {
    try {
      if (auth.currentUser) {
        const createdAt = new Date();
        const newStudent: Omit<Student, 'id'> = {
          firstName: student.firstName,
          lastName: student.lastName,
          isActive: true,
          createdAt,
        };

        await db
          .collection('teachers')
          .doc(auth.currentUser?.uid)
          .collection('students')
          .add(newStudent);
      } else {
        throw new Error('Auth error');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error adding document: ', error);
    }
  };

  const addLesson = async (studentId: string, lesson: LessonFormValues) => {
    try {
      if (auth.currentUser) {
        const createdAt = new Date();
        const newWords = wordsToArray(lesson.newWords);
        const newLesson: Omit<Lesson, 'id'> = {
          date: lesson.date,
          lessonNumber: lesson.lessonNumber,
          lessonPlan: lesson.lessonPlan,
          homework: lesson.homework,
          comment: lesson.comment,
          createdAt,
          newWords,
        };

        await db
          .collection('teachers')
          .doc(auth.currentUser.uid)
          .collection('students')
          .doc(studentId)
          .collection('lessons')
          .add(newLesson);
      } else {
        throw new Error('Auth error');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error adding document: ', error);
    }
  };

  const subscribeOnStudents = (
    cb: onChangeCallback<Student[]>,
  ): firebase.Unsubscribe => db
    .collection('teachers')
    .doc(auth.currentUser?.uid)
    .collection('students')
    .where('isActive', '==', true)
    .orderBy('createdAt', 'desc')
    .onSnapshot((snapshot) => {
      const students = snapshot.docs.map((doc) => {
        const data = doc.data() as StudentDoc;
        const student: Student = {
          id: doc.id,
          firstName: data.firstName,
          lastName: data.lastName,
          isActive: data.isActive,
          createdAt: data.createdAt.toDate(),
        };

        return student;
      });

      cb(students);
    });

  const subscribeOnLessons = (
    studentId: string,
    cb: onChangeCallback<Lesson[]>,
  ): firebase.Unsubscribe => db
    .collection('teachers')
    .doc(auth.currentUser?.uid)
    .collection('students')
    .doc(studentId)
    .collection('lessons')
    .orderBy('date', 'desc')
    .onSnapshot((snapshot) => {
      const lessons = snapshot.docs.map((doc) => {
        const data = doc.data() as LessonDoc;
        const lesson: Lesson = {
          id: doc.id,
          date: data.date.toDate(),
          lessonNumber: data.lessonNumber,
          lessonPlan: data.lessonPlan,
          homework: data.homework,
          comment: data.comment,
          newWords: data.newWords,
          createdAt: data.createdAt.toDate(),
        };

        return lesson;
      });

      cb(lessons);
    });

  return {
    db,
    addLesson,
    addStudent,
    subscribeOnLessons,
    subscribeOnStudents,
  };
};

export default useDatabase;
