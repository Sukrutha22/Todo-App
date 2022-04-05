import firebase from 'firebase/app'
import 'firebase/firestore'
import "firebase/auth"
import "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyDW-fqM5Jw__Ox1tsqaeYBnl_BX1ZM4mns",
  authDomain: "todo1-66c0a.firebaseapp.com",
  projectId: "todo1-66c0a",
  storageBucket: "todo1-66c0a.appspot.com",
  messagingSenderId: "843353889754",
  appId: "1:843353889754:web:dd8a5351af3e3ce37e7ee3"
};
  export default firebase.initializeApp(firebaseConfig);
   

