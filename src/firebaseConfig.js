import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwQFDgR4qgSuqFYG6geRzZfHOmckg7bAI",
  authDomain: "student-management-c716a.firebaseapp.com",
  projectId: "student-management-c716a",
  storageBucket: "student-management-c716a.firebasestorage.app",
  messagingSenderId: "594622411507",
  appId: "1:594622411507:web:f6cd54a310fb1f34687d86"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
