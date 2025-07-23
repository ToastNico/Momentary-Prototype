import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyDIfAAfjtQ2NEYF9L0qB07ExMuTuV2UKD0",
  authDomain: "momentary-4b259.firebaseapp.com",
  projectId: "momentary-4b259",
  storageBucket: "momentary-4b259.firebasestorage.app",
  messagingSenderId: "684829600116",
  appId: "1:684829600116:web:fabe600bbd4f2024cb2421",
  measurementId: "G-05W61JP605"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage };