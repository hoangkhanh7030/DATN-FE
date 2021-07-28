import firebase from "firebase/app";
import "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCq4HKX2yFhAhHjJQHGvLkmGefwXS7jjeU",
  authDomain: "hr-resourcing-app-10cd0.firebaseapp.com",
  projectId: "hr-resourcing-app-10cd0",
  storageBucket: "hr-resourcing-app-10cd0.appspot.com",
  messagingSenderId: "249594175303",
  appId: "1:249594175303:web:bbd62270bd0804528e3662",
  measurementId: "G-N5C69WZRQM",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
