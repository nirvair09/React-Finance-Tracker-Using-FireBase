// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAQxGiJkTdFiEFOnUuD3KJWWcUja8IFQA",
  authDomain: "react-finance-tracker-dc85d.firebaseapp.com",
  projectId: "react-finance-tracker-dc85d",
  storageBucket: "react-finance-tracker-dc85d.firebasestorage.app",
  messagingSenderId: "638901115845",
  appId: "1:638901115845:web:3e0975445a5e0a421989ac",
  measurementId: "G-L795DEKK9D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);