import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJ4dZGN-_M-tryYj6AT9oQKTLEWqesuMU",
  authDomain: "skiniq-eaa97.firebaseapp.com",
  projectId: "skiniq-eaa97",
  storageBucket: "skiniq-eaa97.firebasestorage.app",
  messagingSenderId: "387584351297",
  appId: "1:387584351297:web:a1e37253f19cf10e85fac0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
