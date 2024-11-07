import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcu9StwIV8-mFLtwf0Eqn4BqPZWDlCYuc",
  authDomain: "real-time-chat-f6391.firebaseapp.com",
  projectId: "real-time-chat-f6391",
  storageBucket: "real-time-chat-f6391.firebasestorage.app",
  messagingSenderId: "517357900811",
  appId: "1:517357900811:web:ac0fe880302ed60d61a30e",
  measurementId: "G-DS1EE44RS5",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const setupFirebaseAuthPersistence = async () => {
  try {
    await setPersistence(auth, browserLocalPersistence);
  } catch (error) {
    console.error("Error setting persistence:", error);
  }
};

export { auth, GoogleAuthProvider, db };
