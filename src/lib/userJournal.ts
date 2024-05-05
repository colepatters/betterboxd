import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import { getUserDataFromIdToken } from "./firebase-server";
import type { JournalEntry } from "./types";
import {
  getUserBySessionToken,
  getUserUIDFromSessionToken,
} from "./userProfiles/user-profiles-server";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: cert("betterboxd-service-account.json"),
  });
}

export async function newJournalEntry(
  journalEntry: JournalEntry,
  sessionToken: string
) {
  // validate user id token
  const userUidRes = await getUserUIDFromSessionToken(sessionToken);

  if (!userUidRes.ok)
    return {
      ok: false,
      reason: "could not locate user from session token",
    };

  // add entry to db
  await admin
    .firestore()
    .collection(`users/${userUidRes.uid}/journal`)
    .doc()
    .set(journalEntry);

  return;
}
