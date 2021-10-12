import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.DB_API_KEY,
    authDomain: process.env.DB_AUTH_DOMAIN,
    projectId: process.env.DB_PROJECT_ID,
    storageBucket: process.env.DB_STORAGE_BUCKET,
    messagingSenderId: process.env.DB_MESSAGING_SENDER_ID,
    appId: process.env.DB_APP_ID
};
if(firebaseConfig.apiKey && firebaseConfig.projectId){
    console.log('DATABASE connect ok')
} else {
    console.log('DATABASE connect BAD!')
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);