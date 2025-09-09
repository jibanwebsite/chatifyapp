import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "appdemo-6597b.firebaseapp.com",
  projectId: "appdemo-6597b",
  storageBucket: "appdemo-6597b.firebasestorage.app",
  messagingSenderId: "676583242550",
  appId: "1:676583242550:web:3e4c09b480159b17061197",
  measurementId: "G-H7SPN3XLZF"
  
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth()
export const db = getFirestore()

