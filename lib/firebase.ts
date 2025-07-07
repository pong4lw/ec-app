// lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCw8L0WDOrxVQvLd26WroKOCQngalT0mSI",
  authDomain: "ec-app-19174.firebaseapp.com",
  projectId: "ec-app-19174",
  storageBucket: "ec-app-19174.firebasestorage.app",
  messagingSenderId: "275935072429",
  appId: "1:275935072429:web:e3c91ccf7c997d6702f624",
  measurementId: "G-HM8E37ZYRC"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
