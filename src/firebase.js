// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA-ZuCRfovVxrnguKFoqQ3rEh2yi_OLNrg",
  authDomain: "clone-app-c41f4.firebaseapp.com",
  projectId: "clone-app-c41f4",
  storageBucket: "clone-app-c41f4.appspot.com",
  messagingSenderId: "308782322950",
  appId: "1:308782322950:web:8efbb729d71d1e45ff3a87",
  measurementId: "G-35GZKQLHPP",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db,auth};
