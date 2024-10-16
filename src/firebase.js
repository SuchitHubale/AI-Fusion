import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGk4rZDbNPhV1IB0cpzgcZZ8jZf8Z2eu8",
  authDomain: "aifusion-62507.firebaseapp.com",
  projectId: "aifusion-62507",
  storageBucket: "aifusion-62507.appspot.com",
  messagingSenderId: "695641932909",
  appId: "1:695641932909:web:c658b9bb0ef5758b6f6b64",
  measurementId: "G-C9LCD8TXL9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore();
const storage = getStorage();
// Initialize Firestore

export { firestore, storage, app };
