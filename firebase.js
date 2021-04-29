import  firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC4GnPeHTKDgO59bL__mjEkE6RqWfK751I",
    authDomain: "signal-clone-6d95e.firebaseapp.com",
    projectId: "signal-clone-6d95e",
    storageBucket: "signal-clone-6d95e.appspot.com",
    messagingSenderId: "714017070194",
    appId: "1:714017070194:web:96ef0a5072da0910b9f6eb"
  };

  let app;

  if(firebase.apps.length === 0){
      app = firebase.initializeApp(firebaseConfig);
  }
  else{
      app = firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();
  //console.log(auth);

  export {db, auth};
