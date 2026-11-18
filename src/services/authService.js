import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

export async function registerUser(name, email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName: name });
  // save the user in the "users" collection
  await setDoc(doc(db, "users", cred.user.uid), {
    name,
    email,
    createdAt: serverTimestamp(),
  });
  return cred.user;
}

export const loginUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logoutUser = () => signOut(auth);

export function friendlyAuthError(code) {
  switch (code) {
    case "auth/email-already-in-use": return "That email is already registered.";
    case "auth/weak-password": return "Password must be at least 6 characters.";
    case "auth/invalid-email": return "Please enter a valid email.";
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password": return "Wrong email or password.";
    default: return "Something went wrong. Please try again.";
  }
}