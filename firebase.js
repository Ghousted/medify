import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID // Optional for Analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get Auth and Firestore instances
const auth = getAuth(app);
const db = getFirestore(app);

// Function for signing up a user with email and password
const doCreateUserWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function for signing in a user with email and password
const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to send email verification
const doSendEmailVerification = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      await sendEmailVerification(user);
      console.log("Verification email sent successfully.");
    } catch (error) {
      console.error("Error sending verification email:", error);
      throw new Error(error.message);
    }
  } else {
    throw new Error("No user is currently signed in.");
  }
};

// Function to reset password by sending a reset email
const doPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to add user data to Firestore
const addUserToFirestore = async (uid, firstName, lastName, email) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    await setDoc(userDocRef, {
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to get user name from Firestore
const getUserNameFromFirestore = async (uid) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data().name;
    }
    throw new Error("User not found in Firestore.");
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to sign out the user
const doSignOut = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('user'); // Clear the user data from local storage
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

// Setup authentication state listener
const setupAuthStateListener = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      const userData = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
      };
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
    callback(user);
  });
};

export {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSendEmailVerification,
  doPasswordReset,
  addUserToFirestore,
  getUserNameFromFirestore,
  doSignOut,
  db,
  auth,
  setupAuthStateListener
};
