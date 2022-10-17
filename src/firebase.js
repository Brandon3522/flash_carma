// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAs8RdSmy7ZUGtXs19U9mkIN2htHEkcFJ0",
  authDomain: "flash-carma.firebaseapp.com",
  projectId: "flash-carma",
  storageBucket: "flash-carma.appspot.com",
  messagingSenderId: "523520490614",
  appId: "1:523520490614:web:a927bf2dbe454126d03357"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const database = getFirestore(app)

export const auth = getAuth(app);

