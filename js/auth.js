import { auth, db } from './firebase-config.js';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

export let currentUserProfile = null;
let authStateListeners = [];

export function onAuthChange(callback) {
  authStateListeners.push(callback);
}

function notifyListeners(user) {
  authStateListeners.forEach(cb => cb(user));
}

// Track auth state automatically
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, fetch their custom profile from Firestore
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        currentUserProfile = { ...user, ...userDoc.data() };
      } else {
        currentUserProfile = user; // Fallback
      }
      notifyListeners(currentUserProfile);
    } catch (e) {
      console.error("Error fetching user profile:", e);
      currentUserProfile = user;
      notifyListeners(currentUserProfile);
    }
  } else {
    // User is signed out
    currentUserProfile = null;
    notifyListeners(null);
  }
});

export async function signUp(email, password, username) {
  try {
    // 1. Create the user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    
    // 2. Call Netlify function to create profile and check username uniqueness
    const response = await fetch('/.netlify/functions/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, username, email })
    });
    
    if (!response.ok) {
      const data = await response.json();
      // If profile creation fails (e.g. username taken), we should delete the auth user
      await userCredential.user.delete();
      throw new Error(data.error || 'Failed to create profile');
    }
    
    return userCredential.user;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
}

export async function logIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function logOut() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}
