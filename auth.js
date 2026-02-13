// ===== auth.js – ONLY for Login and Signup pages =====
// FIXED VERSION - Proper error handling and redirects

const firebaseConfig = {
  apiKey: "AIzaSyB9OEjBRYc9WeqJ5yUcA9BOP8Ju2PIMb-c",
  authDomain: "carflex-8dd99.firebaseapp.com",
  projectId: "carflex-8dd99",
  storageBucket: "carflex-8dd99.firebasestorage.app",
  messagingSenderId: "357221879980",
  appId: "1:357221879980:web:ab4d0240083e63f3530f09"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

// ---------- GOOGLE SIGN-IN ----------
async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await auth.signInWithPopup(provider);
    console.log("User logged in:", result.user.email);
    window.location.href = 'index.html';
    return result;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
}

// ---------- EMAIL SIGN-UP ----------
async function signUpWithEmail(email, password) {
  try {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    console.log("User created:", result.user.email);
    window.location.href = 'index.html';
    return result;
  } catch (error) {
    console.error("Sign-up Error:", error);
    throw error;
  }
}

// ---------- EMAIL SIGN-IN ----------
async function signInWithEmail(email, password) {
  try {
    const result = await auth.signInWithEmailAndPassword(email, password);
    console.log("User logged in:", result.user.email);
    window.location.href = 'index.html';
    return result;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
}

// ---------- PASSWORD RESET ----------
async function resetPassword(email) {
  try {
    await auth.sendPasswordResetEmail(email);
    console.log("Password reset email sent to:", email);
    return true;
  } catch (error) {
    console.error("Password Reset Error:", error);
    throw error;
  }
}

// ---------- SIGNOUT ----------
async function signOut() {
  try {
    await auth.signOut();
    console.log("User signed out");
    window.location.href = 'index.html';
    return true;
  } catch (error) {
    console.error("Signout Error:", error);
    throw error;
  }
}