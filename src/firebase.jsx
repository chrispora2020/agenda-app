// src/firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Reemplaza los valores de firebaseConfig con los de tu proyecto en Firebase Console.
const firebaseConfig = {
  apiKey: "AIzaSyC3t-FHW6oBkDk89htiSr16OsCmU-vvNGg",
  authDomain: "agendaprimaria-e5760.firebaseapp.com",
  projectId: "agendaprimaria-e5760",
  storageBucket: "agendaprimaria-e5760.firebasestorage.app",
  messagingSenderId: "874264168718",
  appId: "1:874264168718:web:5504115ce6982d389def5f",
  measurementId: "G-BSYQELMPT3"
};


firebase.initializeApp(firebaseConfig);

// Inicializamos Firestore
const db = firebase.firestore();

export { db };
