import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.DB_API_KEY,
    authDomain: "mycarrental-4e1e9.firebaseapp.com",
    projectId: "mycarrental-4e1e9",
    storageBucket: "mycarrental-4e1e9.appspot.com",
    messagingSenderId: "207950094671",
    appId: "1:207950094671:web:b0b979b4e6fea0f020e53a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);