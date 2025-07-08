// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOdfJlxJLxZnqPU1E49twMx5O6xYd3U3E",
  authDomain: "admin-dashboard-c8f89.firebaseapp.com",
  databaseURL: "https://admin-dashboard-c8f89-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "admin-dashboard-c8f89",
  storageBucket: "admin-dashboard-c8f89.appspot.com", // ✅ Fixed here
  messagingSenderId: "631109375173",
  appId: "1:631109375173:web:f7e35e861111a255964cac",
  measurementId: "G-KQM1L3VE1F"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Export services
export const database = getDatabase(app);
export const auth = getAuth(app);




