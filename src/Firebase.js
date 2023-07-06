import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH0bajLef6kHNcLQDCcx161jQA3PvjXaE",
  authDomain: "artyphilic-20a86.firebaseapp.com",
  projectId: "artyphilic-20a86",
  storageBucket: "artyphilic-20a86.appspot.com",
  messagingSenderId: "532044762332",
  appId: "1:532044762332:web:2ac11cb6c2cf5aa17e7819"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider();

export default app;