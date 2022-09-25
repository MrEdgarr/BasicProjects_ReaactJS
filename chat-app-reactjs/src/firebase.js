// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBUrhog1Vt_VTf39nwtEUqqWAAyP1mZtiw",
    authDomain: "chat-8d2d3.firebaseapp.com",
    projectId: "chat-8d2d3",
    storageBucket: "chat-8d2d3.appspot.com",
    messagingSenderId: "439673767987",
    appId: "1:439673767987:web:655dc4e9d32d1b14bb3b46"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()