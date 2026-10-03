import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // Paste your Firebase config here
  apiKey: "AIzaSyDD8dWRtQmDxIa2Y4Tp_I2mCLUPf_zoq6U",
  authDomain: "hydratrack-d5361.firebaseapp.com",
  projectId: "hydratrack-d5361",
  storageBucket: "hydratrack-d5361.firebasestorage.app",
  messagingSenderId: "198978863264",
  appId: "1:198978863264:web:23645846a0dccd79c949c5",
  measurementId: "G-7MYYG6QRHZ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

console.log("Firebase initialized successfully");

export default app;