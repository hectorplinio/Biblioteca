// Aqui va el driver de conexión de firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl42PpLxpp0yMIlxxnagX5pzoKh9jSEj8",
  authDomain: "svelteproyect.firebaseapp.com",
  projectId: "svelteproyect",
  storageBucket: "svelteproyect.appspot.com",
  messagingSenderId: "999666199374",
  appId: "1:999666199374:web:22db555fa6a7bd18224c1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();