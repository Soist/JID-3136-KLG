import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwSJlUcZ5kM5QL7-Sex09tnA3Eh1Q7vDg",
  authDomain: "klgjid.firebaseapp.com",
  projectId: "klgjid",
  storageBucket: "klgjid.appspot.com",
  messagingSenderId: "804383270688",
  appId: "1:804383270688:web:6f17b456a62f03f618d945",
  measurementId: "G-0XLJZ96619"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

// const analytics = getAnalytics(app);