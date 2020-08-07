// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCcnxQR28c79BCASMPPsmdSHa93SU0vD_A",
  authDomain: "ninja-game-guidez-c1787.firebaseapp.com",
  databaseURL: "https://ninja-game-guidez-c1787.firebaseio.com",
  projectId: "ninja-game-guidez-c1787",
  storageBucket: "ninja-game-guidez-c1787.appspot.com",
  messagingSenderId: "75995961979",
  appId: "1:75995961979:web:5891be3695e707389920de",
  measurementId: "G-C25WWJYLJF",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Make auth and firestore refrences
export const auth = firebase.auth();
export const db = firebase.firestore();
export const functions = firebase.functions();
