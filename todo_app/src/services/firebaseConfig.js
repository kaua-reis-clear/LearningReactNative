// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDmk6xwpDJXE9AAUB2u4vJweifOoz2bN8w',
  authDomain: 'todoapprn-9666a.firebaseapp.com',
  projectId: 'todoapprn-9666a',
  storageBucket: 'todoapprn-9666a.appspot.com',
  messagingSenderId: '872514286860',
  appId: '1:872514286860:web:04be505c0bc5f88e378529',
  measurementId: 'G-P6VNQZG1PL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
