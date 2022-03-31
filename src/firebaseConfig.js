import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAVZKBxc04Z-xsPlWVbagv0sHGxbzuURq4",
    authDomain: "todo-49d41.firebaseapp.com",
    projectId: "todo-49d41",
    storageBucket: "todo-49d41.appspot.com",
    messagingSenderId: "406924316427",
    appId: "1:406924316427:web:ef4eb4e6eadb98d44bdc0e"
  };

  export default firebase.initializeApp(firebaseConfig);
