import { getFirestore } from "$lib/db/server-firestore";
import type { User } from "$lib/types";

import {
  checkDisplayNameValid,
  checkDisplayNameAvailable,
} from "$lib/auth/server-auth";

export async function getUserByUID(userUID: string): Promise<User> {
  const firestore = getFirestore();

  const userRef = firestore.doc(`users/${userUID}`);
  const journalEntriesRef = userRef.collection("journal");

  const journalEntryRefs = await journalEntriesRef.listDocuments();

  let journalEntries: {} = {};
  for await (const currentEntry of journalEntryRefs) {
    const currentEntryData = (await currentEntry.get()).data();
    journalEntries[currentEntry.id] = currentEntryData;
  }

  let profileData = (await userRef.get()).data();

  return {
    created: profileData.created,
    displayName: profileData.displayName,
    journal: journalEntries,
  };
}

export async function getUserBySessionToken(sessionToken: string) {
  const firestore = getFirestore();
  const ref = await firestore
    .collection("userCredentials")
    .where("sessionToken", "==", sessionToken)
    .get();

  if (ref.empty)
    return {
      ok: false,
      reason: "could not find user with that token",
    };

  const profile = await getUserByUID(ref.docs[0].id);
  return profile;
}

export async function getUserByDisplayName(displayName: string) {
  const firestore = getFirestore();
  const ref = await firestore
    .collection("users")
    .where("displayName", "==", displayName)
    .get();

  if (ref.empty)
    return {
      ok: false,
      reason: "could not find user with display name",
    };

  const profile = await getUserByUID(ref.docs[0].id);

  return {
    ok: true,
    profile,
  };
}

export async function getUserUIDFromSessionToken(sessionToken: string) {
  const firestore = getFirestore();
  const ref = await firestore
    .collection("userCredentials")
    .where("sessionToken", "==", sessionToken)
    .get();

  if (ref.empty)
    return {
      ok: false,
      reason: "could not find user with that token",
    };

  return {
    ok: true,
    uid: ref.docs[0].id,
  };
}

export async function validateSessionToken(
  sessionToken: string
): Promise<boolean> {
  const firestore = getFirestore();
  const ref = await firestore
    .collection("userCredentials")
    .where("sessionToken", "==", sessionToken)
    .get();

  return !ref.empty;
}

export async function changeOwnDisplayName(
  displayName: string,
  sessionToken: string
) {
  const tokenValid = await validateSessionToken(sessionToken);
  if (!tokenValid)
    return {
      ok: false,
      reason: "session token invalid",
    };

  if (!checkDisplayNameValid(displayName))
    return {
      ok: false,
      reason: "display name invalid",
    };

  if (!(await checkDisplayNameAvailable(displayName)))
    return {
      ok: false,
      reason: "display name taken",
    };

  const firestore = getFirestore();
  const ref = await firestore
    .collection("userCredentials")
    .where("sessionToken", "==", sessionToken)
    .get();

  if (ref.empty)
    return {
      ok: false,
      reason: "could not locate user by session token",
    };

  const userProfileRef = firestore.doc(`users/${ref.docs[0].id}`);
  await userProfileRef.update({
    displayName,
  });

  return {
    ok: true,
  };
}
