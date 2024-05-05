import { getAdmin } from "$lib/firebase-server";

export function getFirestore() {
  const admin = getAdmin();
  const firestore = admin.firestore();
  return firestore;
}
