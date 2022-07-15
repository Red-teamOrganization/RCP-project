// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUGXu0j11qxS6D8NmmxVj9Jzjm6pujMtg",
  authDomain: "rcpproject.firebaseapp.com",
  projectId: "rcpproject",
  storageBucket: "rcpproject.appspot.com",
  messagingSenderId: "813805243331",
  appId: "1:813805243331:web:d6fda46f98f26503d84b76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db}