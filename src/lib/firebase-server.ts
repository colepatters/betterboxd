import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import type { UserRecord } from "firebase-admin/auth";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: cert("betterboxd-service-account.json"),
  });
}

export function getAdmin() {
  return admin;
}

// it's fine to pass potentially sensitive data back because this function will
// only be called when a user has an ID Token granted from auth
export async function getUserDataFromIdToken(userIdToken: string) {
  const res = await admin.auth().verifyIdToken(userIdToken);
  return res;
}

export async function getUserDataFromUID(userUID: string) {}

export async function userEmailSignUp() {}
