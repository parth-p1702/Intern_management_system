// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "intern-management-system-f381c.firebaseapp.com",
  projectId: "intern-management-system-f381c",
  storageBucket: "intern-management-system-f381c.firebasestorage.app",
  messagingSenderId: "170021524878",
  appId: "1:170021524878:web:79a818f8a0706f3230c0df",
  measurementId: "G-FPVV38VX32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);