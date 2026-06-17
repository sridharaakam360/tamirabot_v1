import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2g5PpDVMM22VZroSDpOq3RYklZtfrlpc",
  authDomain: "tamirabot.firebaseapp.com",
  projectId: "tamirabot",
  storageBucket: "tamirabot.firebasestorage.app",
  messagingSenderId: "635403924355",
  appId: "1:635403924355:web:9e83a89b1fe1f313bffcb6"
};

// Initialize Firebase for SSR compatibility
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
