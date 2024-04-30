import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import type { UserRecord } from "firebase-admin/auth";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: cert("betterboxd-service-account.json"),
  });
}

function removeSensitiveUserData(userData: UserRecord) {
  return {
    uid: userData.uid,
    displayName: userData.displayName,
    photoURL: userData.photoURL,
  };
}

// it's fine to pass potentially sensitive data back because this function will
// only be called when a user has an ID Token granted from auth
export async function getUserDataFromIdToken(userIdToken: string) {
  const res = await admin.auth().verifyIdToken(userIdToken);
  return res;
}

export async function getUserDataFromUID(userUID: string) {
  const data = await admin.auth().getUser(userUID);
  return removeSensitiveUserData(data);
}
