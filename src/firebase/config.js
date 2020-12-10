import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB0d-WjikTgPk9qgDdwAz-1v-5OHjaVXUQ",
    authDomain: "care-for-elderly.firebaseapp.com",
    projectId: "care-for-elderly",
    storageBucket: "care-for-elderly.appspot.com",
    messagingSenderId: "343826491195",
    appId: "1:343826491195:web:a1a60dd114ea45bee4391e"
};

//init firebase
firebase.initializeApp(firebaseConfig)

//init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

//timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

  export { projectFirestore, projectAuth, projectStorage, timestamp }