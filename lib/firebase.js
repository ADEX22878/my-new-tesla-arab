// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCE6Kt5aanFlCVq1Kh7TJUOcnMXAXHBPTQ",
  authDomain: "my-new-tesla-project-arab.firebaseapp.com",
  projectId: "my-new-tesla-project-arab",
  storageBucket: "my-new-tesla-project-arab.firebasestorage.app",
  messagingSenderId: "610573273902",
  appId: "1:610573273902:web:804c842addb94e3bcbc8bf",
  measurementId: "G-VNFKJ50L89",
};

// Initialize Firebase (safeguarded against duplicate initializations in Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Cloud Firestore, Auth, and Analytics
export const db = getFirestore(app);
export const auth = getAuth(app);

let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { analytics };
