// ===== auth.js – ONLY for Login and Signup pages =====

const firebaseConfig = {
  apiKey: "AIzaSyB9OEjBRYc9WeqJ5yUcA9BOP8Ju2PIMb-c",
  authDomain: "carflex-8dd99.firebaseapp.com",
  projectId: "carflex-8dd99",
  storageBucket: "carflex-8dd99.firebasestorage.app",
  messagingSenderId: "357221879980",
  appId: "1:357221879980:web:ab4d0240083e63f3530f09"
};

// 1. Initialize Firebase (Check if already initialized to prevent errors)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// 2. Define Auth once
const auth = firebase.auth();

// ---------- GOOGLE SIGN-IN ----------
function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then((result) => {
      window.location.href = 'index.html';
    })
    .catch(error => {
      // 🔥 NOW YOU WILL SEE THE REAL ERROR CODE
      console.error("FULL ERROR OBJECT:", error);
      alert(`Sign-in failed!\n\nError Code: ${error.code}\nMessage: ${error.message}`);
    });
}

// ---------- EMAIL SIGN-UP ----------
function signUpWithEmail(email, password) {
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = 'index.html';
    })
    .catch(error => {
      console.error(error);
      alert(error.message);
    });
}

// ---------- EMAIL SIGN-IN ----------
function signInWithEmail(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = 'index.html';
    })
    .catch(error => {
      console.error(error);
      alert(error.message);
    });
}

// ---------- PASSWORD RESET ----------
function resetPassword(email) {
  auth.sendPasswordResetEmail(email)
    .then(() => {
      alert('Password reset email sent!');
    })
    .catch(error => {
      alert(error.message);
    });
}