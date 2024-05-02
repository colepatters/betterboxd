import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import { getUserDataFromIdToken, getUserDataFromUID } from "./firebase-server";
import type { Journal, JournalEntry, UserProfile } from "./types";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: cert("betterboxd-service-account.json"),
  });
}

const firestore = admin.firestore();

export async function getUserProfileByUID(userUID: string) {
  const userRef = firestore.doc(`users/${userUID}`);
  const journalEntriesRef = userRef.collection("journal");

  const journalEntryRefs = await journalEntriesRef.listDocuments();

  let journalEntries: {} = {};
  for await (const currentEntry of journalEntryRefs) {
    const currentEntryData = (await currentEntry.get()).data();
    journalEntries[currentEntry.id] = currentEntryData;
  }

  let profileData = (await userRef.get()).data();
  profileData = Object.defineProperty(profileData, "created", {
    value: profileData.created.seconds,
  });

  const userData = await getUserDataFromUID(userUID);

  return {
    user: userData,
    profile: profileData,
    journal: journalEntries,
  };
}

export async function getUserProfileByDisplayName(displayName: string) {
  const ref = await firestore
    .collection("users")
    .where("displayName", "==", displayName)
    .get();

  const userUID = ref.docs[0].id;
  return await getUserDataFromUID(userUID);
}

export async function checkDisplayNameTaken(displayName: string) {
  const ref = await firestore
    .collection("users")
    .where("displayName", "==", displayName)
    .get();

  return !ref.empty;
}

export async function changeOwnDisplayName(
  displayName: string,
  userIdToken: string
) {
  // last-minute check that the username is not taken
  const taken = await checkDisplayNameTaken(displayName);
  if (taken) throw new Error("display name taken");

  const user = await getUserDataFromIdToken(userIdToken);

  const userProfileRef = admin.firestore().doc(`users/${user.uid}`);
  if (!(await userProfileRef.get()).exists)
    throw new Error("user does not exist");
  await userProfileRef.update({
    displayName,
  });

  return;
}

export function validateDisplayName(displayName: string) {
  let valid = true;
  let reason = "";

  if (displayName.length < 4 || displayName.length > 12) {
    valid = false;
    reason = "display name must be between 4 and 12 characters";
  }

  // todo = check profanity becasue I'm lame

  return { valid, reason };
}

export function getUserFavorites(journal: Journal) {
  let favorites = {};

  for (const [journalEntryId, journalEntry] of Object.entries(journal)) {
    if (journalEntry.favorite) {
      favorites[journalEntryId] = journalEntry;
    }
  }

  return favorites;
}
