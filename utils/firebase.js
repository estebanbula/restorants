import firebase from 'firebase/app'
import 'firebase/firestore'

  let firebaseConfig = {
    apiKey: "AIzaSyCE-Hjc6DEWG_TGonQJW3kZxYrESHJMYg0",
    authDomain: "restorants-935be.firebaseapp.com",
    projectId: "restorants-935be",
    storageBucket: "restorants-935be.appspot.com",
    messagingSenderId: "222228092209",
    appId: "1:222228092209:web:70fb43ccceb857c5630c10"
  };

  export const firebaseApp = firebase.initializeApp(firebaseConfig)