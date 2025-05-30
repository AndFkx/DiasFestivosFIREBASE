// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyATOSbpoGpUaKgbY6C6511MlLXJGerTMQc",
  authDomain: "festivos-9cb58.firebaseapp.com",
  projectId: "festivos-9cb58",
  storageBucket: "festivos-9cb58.firebasestorage.app",
  messagingSenderId: "185295687521",
  appId: "1:185295687521:web:db98eed608bdb2cfd67f20",
  measurementId: "G-Q53ERE1LWT"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
