/* eslint-disable import/no-duplicates */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyDRcKrVqzokEB12bYZbtQdz2EugOLubr6U',
  authDomain: 'lesson-notes-app.firebaseapp.com',
  projectId: 'lesson-notes-app',
  storageBucket: 'lesson-notes-app.appspot.com',
  messagingSenderId: '1077695103660',
  appId: '1:1077695103660:web:8eb7b27e06ba32de8e9509',
};

export type User = firebase.User;

const firebaseApp = firebase.initializeApp(config);

export const auth = firebaseApp.auth();
export const db = firebaseApp.firestore();
