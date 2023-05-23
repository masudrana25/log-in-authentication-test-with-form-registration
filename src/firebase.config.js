
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBcKnFmpBtcjDGFaQCUS0BieZl7igAQSu8",
  authDomain: "login-authentication-test-25.firebaseapp.com",
  projectId: "login-authentication-test-25",
  storageBucket: "login-authentication-test-25.appspot.com",
  messagingSenderId: "396930108383",
  appId: "1:396930108383:web:2d0c316ef6e86a28fb526a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth, provider};