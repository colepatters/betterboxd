import { auth } from "$lib/firebase-client";
import { getUserDataFromIdToken } from "$lib/firebase-server";
import { getUserProfileByUID } from "$lib/userProfiles";
import { error, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const userIdToken = event.cookies.get("__session");

  try {
    if (userIdToken) {
      const user = await getUserDataFromIdToken(userIdToken);
      event.locals.user = user;

      const userProfile = await getUserProfileByUID(user.uid);
      console.log(userProfile);
      event.locals.userProfile = userProfile;
    } else {
      event.locals.user = null;
      event.locals.userProfile = null;
    }
  } catch (e) {
    if (e.message.includes("Firebase ID token has expired")) {
      event.cookies.delete("__session", {
        path: "/",
      });

      // todo: add notification that session expired
    } else return error(500, e.message);
  }

  const response = await resolve(event);
  return response;
};
