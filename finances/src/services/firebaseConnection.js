import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyADY2DGXNYbqOu1KKX6VHhl34j4BysxYic',
  authDomain: 'finances-fdce1.firebaseapp.com',
  databaseURL: 'https://finances-fdce1-default-rtdb.firebaseio.com',
  projectId: 'finances-fdce1',
  storageBucket: 'finances-fdce1.appspot.com',
  messagingSenderId: '411215053268',
  appId: '1:411215053268:web:2659bc9ca89b92361a1641',
  measurementId: 'G-NSKMCRQ0TK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
