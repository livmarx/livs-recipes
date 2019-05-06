import firebase from 'firebase';
import firestore from 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyDu9WFdDOjGNg6vy0MpPEJFexNF-0Hvnio',
  authDomain: 'liv-recipes.firebaseapp.com',
  databaseURL: 'https://liv-recipes.firebaseio.com',
  projectId: 'liv-recipes',
  storageBucket: 'liv-recipes.appspot.com',
  messagingSenderId: '281166840810',
  appId: '1:281166840810:web:fe602eadb4424cc4',
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebaseApp.firestore().settings({ timestampsInSnapshots: true });

export default firebaseApp.firestore();
