// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD06v3YXP0cnaRSTz0IMgv8aTU-tDWhbw",
  authDomain: "expense-tracker-26a97.firebaseapp.com",
  projectId: "expense-tracker-26a97",
  storageBucket: "expense-tracker-26a97.appspot.com",
  messagingSenderId: "374978868119",
  appId: "1:374978868119:web:c9cec72b9490af04540ad2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
