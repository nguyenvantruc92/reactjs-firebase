import firebase from "firebase";
const config = {
  apiKey: "AIzaSyBWUXEwvkZO0xs4tik5CUdmAkb5KvSfnXU",
  authDomain: "thang1-265415.firebaseapp.com",
  databaseURL: "https://thang1-265415.firebaseio.com",
  projectId: "thang1-265415",
  storageBucket: "thang1-265415.appspot.com",
  messagingSenderId: "749186653813",
  appId: "1:749186653813:web:d54a829d6d89b656abe23c",
  measurementId: "G-ZBRQKLQFMJ"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
export const realtimeDB = firebase.database();

export default firebase;
