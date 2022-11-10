import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCehTyTLFQam4DsiKDIN305Dq9XbNCCOXM",
    authDomain: "bbeldi-4c225.appspot.com",
    projectId: "beldi-4c225",
    storageBucket: "beldi-4c225.appspot.com",
    messagingSenderId: "586712549866",
    appId: "1:586712549866:web:6448ae4ea86db3b51d0a93"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}