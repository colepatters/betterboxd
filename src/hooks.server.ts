import {
  getUserBySessionToken,
  validateSessionToken,
} from "$lib/userProfiles/user-profiles-server";
import { error, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const sessionToken = event.cookies.get("__session");

  if (sessionToken) {
    const user = await getUserBySessionToken(sessionToken);
    event.locals.user = user;

    const sessionTokenValid = await validateSessionToken(sessionToken);
    if (!sessionTokenValid) {
      return error(401, "Session expired, please sign in again");
    }
  }

  const response = await resolve(event);
  return response;
};
