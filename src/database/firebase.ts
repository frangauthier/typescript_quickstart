import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// TODO: Replace the following with your app's Firebase project configuration
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA_elNNLOsosc_ZlhaCfT2nSptmA7Kxkww",
    authDomain: "mywebapp-775f4.firebaseapp.com",
    projectId: "mywebapp-775f4",
    storageBucket: "mywebapp-775f4.appspot.com",
    messagingSenderId: "884225624752",
    appId: "1:884225624752:web:db57b2fc3823f825e00975"
  };
  

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Get a list of cities from your database
export async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}