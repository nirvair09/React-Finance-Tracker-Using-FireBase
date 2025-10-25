// src/firebase.js

// Import the Firebase functions you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAQxGiJkTdFiEFOnUuD3KJWWcUja8IFQA",
  authDomain: "react-finance-tracker-dc85d.firebaseapp.com",
  projectId: "react-finance-tracker-dc85d",
  storageBucket: "react-finance-tracker-dc85d.firebasestorage.app",
  messagingSenderId: "638901115845",
  appId: "1:638901115845:web:3e0975445a5e0a421989ac",
  measurementId: "G-L795DEKK9D",
};

// ✅ Initialize Firebase app *first*
const app = initializeApp(firebaseConfig);

// ✅ Initialize other Firebase services *after* app
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Export initialized instances
export { db, auth, provider, doc, setDoc };
