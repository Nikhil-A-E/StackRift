import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB6k6VTYc77heSgYRuLBfMRSEas1Ko1jMg",
  authDomain: "stack-rift-database.firebaseapp.com",
  projectId: "stack-rift-database",
  storageBucket: "stack-rift-database.firebasestorage.app",
  messagingSenderId: "253128382603",
  appId: "1:253128382603:web:4ab68621d640ac8e8a1c8e",
  measurementId: "G-4G77XVFMP6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
