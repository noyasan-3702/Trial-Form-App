// firebase.ts

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = initializeApp({
    apiKey: "AIzaSyDmCi_b29dzGvaXuKkRNDMK3J2WnSWh4po",
    authDomain: "school-index-10067.firebaseapp.com",
    projectId: "school-index-10067",
    storageBucket: "school-index-10067.firebasestorage.app",
    messagingSenderId: "1004556224577",
    appId: "1:1004556224577:web:4b5473ab25aa93e6bd1ec0",
    measurementId: "G-FTKWPNS340"
});

export const storage = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);