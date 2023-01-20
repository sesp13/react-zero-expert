// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for, Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA9xTyx6wihVW_cgCTkfhNbo2zbQxRJUEM',
  authDomain: 'firestore-grpah.firebaseapp.com',
  databaseURL: 'https://firestore-grpah-default-rtdb.firebaseio.com',
  projectId: 'firestore-grpah',
  storageBucket: 'firestore-grpah.appspot.com',
  messagingSenderId: '605936981686',
  appId: '1:605936981686:web:6591501946f881aaa3f817',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp)