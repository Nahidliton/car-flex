// ===== auth.js – Firebase Authentication for Login/Signup Pages =====

// Firebase config (use YOUR actual config)
const firebaseConfig = {
  apiKey: "AIzaSyA2tR1NPiNSe-xj6PBo5jvunnaHhgR8SKU",
  authDomain: "carflex-49991.firebaseapp.com",
  projectId: "carflex-49991",
  storageBucket: "carflex-49991.firebasestorage.app",
  messagingSenderId: "208285784821",
  appId: "1:208285784821:web:7e5b8a2fca29463ca043bc"
};

// Initialize Firebase (compat version)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ---------- GOOGLE SIGN-IN ----------
function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(() => {
      window.location.href = 'index.html'; // redirect after success
    })
    .catch(error => {
      console.error(error);
      alert('Google sign-in failed. Please try again.');
    });
}

// ---------- EMAIL/PASSWORD SIGN-UP ----------
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

// ---------- EMAIL/PASSWORD SIGN-IN ----------
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

// ---------- PASSWORD RESET (optional) ----------
function resetPassword(email) {
  auth.sendPasswordResetEmail(email)
    .then(() => {
      alert('Password reset email sent!');
    })
    .catch(error => {
      alert(error.message);
    });
}