import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "./firebase-config";

const auth = getAuth(app);

// listen for auth state changes

export const observeAuthState = (callback) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callback({ user });
    } else {
      callback({ user: null });
    }
  });
};

// Sign in function
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    throw error;
  }
};

// Sign out function
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

//register function
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(
      "User registered successfully!",
      (userCredential.user.uid, userCredential.user.email)
    );
    return userCredential.user;
  } catch (error) {
    console.log("Registration Error", error.message);
    throw error;
  }
};
