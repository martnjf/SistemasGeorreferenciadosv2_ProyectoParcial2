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
firebase.initializeApp(firebaseConfig);
const fbauth = firebase.auth();
const fbdb = firebase.firestore();