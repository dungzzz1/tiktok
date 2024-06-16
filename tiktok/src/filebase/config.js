
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBDkjJGr1oZnJcp_BNNYSlJwq0eO4z0l0",
  authDomain: "toktik-e9070.firebaseapp.com",
  projectId: "toktik-e9070",
  storageBucket: "toktik-e9070.appspot.com",
  messagingSenderId: "308120383095",
  appId: "1:308120383095:web:68ebe73e28a192b6ed2072",
  measurementId: "G-Z2JYGC2NFY"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider();
export default app;
