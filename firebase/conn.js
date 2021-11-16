import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { auth } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js'
import { firestore } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfIf6FCeXmJlKswRdkwZGNfHvPOSiz5sU",
  authDomain: "appvet-480bd.firebaseapp.com",
  projectId: "appvet-480bd",
  storageBucket: "appvet-480bd.appspot.com",
  messagingSenderId: "348071268464",
  appId: "1:348071268464:web:54dab8e563ace9230c24b5"
};

// Initialize Firebase
const fbapp = initializeApp(firebaseConfig);
const fbauth = auth();
const fbdb = firestore();