import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import { getUserDataFromIdToken } from "./firebase-server";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: cert("betterboxd-service-account.json"),
  });
}

export async function newJournalEntry(
  journalEntry: JournalEntry,
  userIdToken: string
) {
  // validate user id token
  const user = await getUserDataFromIdToken(userIdToken);

  // add entry to db
  await admin
    .firestore()
    .collection(`users/${user.uid}/journal`)
    .doc()
    .set(journalEntry);

  return;
}
