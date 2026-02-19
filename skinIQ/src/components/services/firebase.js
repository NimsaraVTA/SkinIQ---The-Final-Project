import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAJ4dZGN-_M-tryYj6AT9oQKTLEWqesuMU",
  authDomain: "skiniq-eaa97.firebaseapp.com",
  projectId: "skiniq-eaa97",
  storageBucket: "skiniq-eaa97.firebasestorage.app",
  messagingSenderId: "387584351297",
  appId: "1:387584351297:web:a1e37253f19cf10e85fac0",
};

const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app);

// Firestore Database
export const db = getFirestore(app);

// Storage (for profile images later)
export const storage = getStorage(app);

export default app;
