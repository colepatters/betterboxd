import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import { getUserDataFromUID } from "./firebase-server";
import { where } from "firebase/firestore";
import { Query } from "firebase-admin/firestore";

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
    .where("display_name", "==", displayName)
    .get();

  const userUID = ref.docs[0].id;
  return await getUserDataFromUID(userUID);
}
