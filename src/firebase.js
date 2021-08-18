import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyABpSheoW7jHDn1Mf1Hr37Jkq_UTTcjRfs",
    authDomain: "react-snapchat-clone-62d0d.firebaseapp.com",
    projectId: "react-snapchat-clone-62d0d",
    storageBucket: "react-snapchat-clone-62d0d.appspot.com",
    messagingSenderId: "519860557107",
    appId: "1:519860557107:web:dd57ab4856e950b3195a46"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };