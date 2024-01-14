// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI8az_GvO7-R4ECVo-k0kcJB-pmpyAx6M",
  authDomain: "social-48e2e.firebaseapp.com",
  projectId: "social-48e2e",
  storageBucket: "social-48e2e.appspot.com",
  messagingSenderId: "522921723708",
  appId: "1:522921723708:web:b4f515bc3d9e38d8630039",
  measurementId: "G-YP5GKGBQ2G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db, onAuthStateChanged}