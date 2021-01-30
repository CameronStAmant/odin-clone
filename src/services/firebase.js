import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBtn5h_qPRyT4vWfTY0PWss-7NP68lJTz4',
  authDomain: 'odin-clone.firebaseapp.com',
  databaseURL: 'https://odin-clone-default-rtdb.firebaseio.com',
  projectId: 'odin-clone',
  storageBucket: 'odin-clone.appspot.com',
  messagingSenderId: '526659951756',
  appId: '1:526659951756:web:d6a43fe879e7157ed0afa9',
  measurementId: 'G-678DPB8PGF',
};
firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
