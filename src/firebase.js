import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // <-- include this

const firebaseConfig = {
  apiKey: "AIzaSyCOdfJlxJLxZnqPU1E49twMx5O6xYd3U3E",
  authDomain: "admin-dashboard-c8f89.firebaseapp.com",
  databaseURL: "https://admin-dashboard-c8f89-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "admin-dashboard-c8f89",
  storageBucket: "admin-dashboard-c8f89.appspot.com",
  messagingSenderId: "631109375173",
  appId: "1:631109375173:web:f7e35e861111a255964cac",
  measurementId: "G-KQM1L3VE1F"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Auth & Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); // <-- export this

// ✅ Database
export const database = getDatabase(app);





