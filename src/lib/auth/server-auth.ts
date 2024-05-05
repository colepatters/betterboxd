import type { UserProfile } from "$lib/types";
import bcrypt from "bcrypt";
import { DateTime } from "luxon";
import { getFirestore } from "$lib/db/server-firestore";

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

async function checkPassword(
  password: string,
  storedHash: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, storedHash);
  return isMatch;
}

export async function checkDisplayNameAvailable(displayName: string) {
  const firestore = getFirestore();
  const ref = await firestore
    .collection("users")
    .where("displayName", "==", displayName)
    .get();

  return ref.empty;
}

// todo
export function checkDisplayNameValid(displayName: string) {
  return true;
}

async function newSessionToken(userUID: string) {
  const firestore = getFirestore();
  const userCredentialsDoc = firestore.doc(`userCredentials/${userUID}`);
  const sessionToken = crypto.randomUUID();
  await userCredentialsDoc.update({
    sessionToken,
  });

  return {
    ok: true,
    sessionToken,
  };
}

async function getSessionToken(userUID: string) {
  const firestore = getFirestore();
  const userCredentialsDoc = await firestore
    .doc(`userCredentials/${userUID}`)
    .get();

  const userCredentialsData = userCredentialsDoc.data();

  return userCredentialsData.sessionToken;
}

async function setupUserProfile(userUID: string, displayName: string) {
  const firestore = getFirestore();

  const userProfile: UserProfile = {
    created: DateTime.now().toISO(),
    displayName,
    journal: {},
  };

  await firestore.collection("users").doc(userUID).set(userProfile);

  return {
    ok: true,
  };
}

export async function emailSignup(
  email: string,
  displayName: string,
  password: string
) {
  const displayNameAvailable = await checkDisplayNameAvailable(displayName);
  if (!displayNameAvailable)
    return {
      ok: false,
      reason: "display name taken",
    };

  const displayNameValid = checkDisplayNameValid(displayName);
  if (!displayNameValid)
    return {
      ok: false,
      reason: "display name invalid",
    };

  const hashedPassword = await hashPassword(password);

  const firestore = getFirestore();

  const userCredentialsDocRef = firestore.collection("userCredentials").doc();
  const userUID = userCredentialsDocRef.id;

  const sessionToken = crypto.randomUUID();

  const userCredentialsData = {
    email,
    password: hashedPassword,
    sessionToken,
  };

  await userCredentialsDocRef.create(userCredentialsData);

  await setupUserProfile(userUID, displayName);

  return {
    ok: true,
    sessionToken,
  };
}

export async function emailSignin(email: string, password: string) {
  const firestore = getFirestore();
  const ref = await firestore
    .collection("userCredentials")
    .where("email", "==", email)
    .get();

  const userCredentialsData = ref.docs[0];

  if (!userCredentialsData)
    return {
      ok: false,
      reason: "Could not find user with that email",
    };

  const passwordMatches = await checkPassword(
    password,
    userCredentialsData.data().password
  );

  if (!passwordMatches)
    return {
      ok: false,
      reason: "password invalid",
    };

  return {
    ok: true,
    sessionToken: userCredentialsData.data().sessionToken,
  };
}
