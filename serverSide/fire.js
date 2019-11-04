const firebase = require("firebase");
require('firebase/firestore');
require('firebase/auth');
require('firebase/storage');

const config = {
  apiKey: "AIzaSyAUnjmbk7HjB35fqciMPXueaU2n-_d31dc",
  authDomain: "splitwise-ee7.firebaseapp.com",
  databaseURL: "https://splitwise-ee7.firebaseio.com",
  projectId: "splitwise-ee7",
  storageBucket: "splitwise-ee7.appspot.com",
  messagingSenderId: "1084559514036",
  appId: "1:1084559514036:web:b04c41c2c774e3a006bae1",
  measurementId: "G-PM5DBDY3GV"
};
const fire = firebase.initializeApp(config);
exports.modules = fire;
