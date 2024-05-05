import { goto, invalidateAll } from "$app/navigation";
import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  connectAuthEmulator,
  EmailAuthProvider,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export const clientFirebaseConfig = {
  apiKey: "AIzaSyDD_5QdSFj1J3nsrRVLW8j2fZKdaoP2WCc",
  authDomain: "betterboxd-511cf.firebaseapp.com",
  projectId: "betterboxd-511cf",
  storageBucket: "betterboxd-511cf.appspot.com",
  messagingSenderId: "502895629632",
  appId: "1:502895629632:web:d2d7d15b7ce0ee817716a5",
  measurementId: "G-HKWHVC0LPY",
};

initializeApp(clientFirebaseConfig);
export const googleProvider = new GoogleAuthProvider();
const emailProvider = new EmailAuthProvider();
export const auth = getAuth();

export async function popupGoogleSignin() {
  const authData = await signInWithPopup(auth, googleProvider);

  const userIdToken = await authData.user.getIdToken();

  // console.log;

  const res = await fetch("/api/auth/signin", {
    method: "post",
    body: JSON.stringify({ userIdToken }),
  });

  // check if user already has account

  // if so, reload the page
  invalidateAll();

  // if not, prompt them to finish their account setup by adding a display name
  // goto("/account?addUsername=true");

  return authData;
}

export async function emailSignin(email: string, password: string) {
  const authData = await signInWithEmailAndPassword(
    auth,
    "cpatterson@xyner.com",
    "dogfoodlid"
  );

  const userIdToken = await authData.user.getIdToken();

  // console.log;

  const res = await fetch("/api/auth/signin", {
    method: "post",
    body: JSON.stringify({ userIdToken }),
  });

  // check if user already has account

  // if so, reload the page
  invalidateAll();

  // if not, prompt them to finish their account setup by adding a display name
  // goto("/account?addUsername=true");

  return authData;
}
