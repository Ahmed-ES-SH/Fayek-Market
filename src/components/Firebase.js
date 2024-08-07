// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuIGuChwJSsgzUdbuwuRaEZ_XYDf0xa30",
  authDomain: "fayek-market.firebaseapp.com",
  projectId: "fayek-market",
  storageBucket: "fayek-market.appspot.com",
  messagingSenderId: "550390528607",
  appId: "1:550390528607:web:bbf74fa3b067cbb411b9ea",
  measurementId: "G-358ZDVW4VM",
  databaseURL: "https://fayek-market-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
