// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCwetR05Pv-GVJJNaHZ_mVCBUDNwUpw9g",
  authDomain: "aplicacion-web-36cae.firebaseapp.com",
  projectId: "aplicacion-web-36cae",
  storageBucket: "aplicacion-web-36cae.appspot.com",
  messagingSenderId: "139458578189",
  appId: "1:139458578189:web:135313d7cc11502a249244"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db}
export default app;