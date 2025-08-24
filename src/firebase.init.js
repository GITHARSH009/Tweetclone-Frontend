// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOf79sRmGBSN3rBiXeJuQ1hH4vk6SRdTY",
  authDomain: "twitter-clone-7bee4.firebaseapp.com",
  projectId: "twitter-clone-7bee4",
  storageBucket: "twitter-clone-7bee4.appspot.com",
  messagingSenderId: "277031233301",
  appId: "1:277031233301:web:f599b40eec7e4cd4152b1c",
  measurementId: "G-EKYC5TFYQF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db = getFirestore(app);

export { auth, db };