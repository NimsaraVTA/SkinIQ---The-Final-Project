// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJ4dZGN-_M-tryYj6AT9oQKTLEWqesuMU",
  authDomain: "skiniq-eaa97.firebaseapp.com",
  projectId: "skiniq-eaa97",
  storageBucket: "skiniq-eaa97.firebasestorage.app",
  messagingSenderId: "387584351297",
  appId: "1:387584351297:web:a1e37253f19cf10e85fac0",
  measurementId: "G-KM1S7ZF10X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);