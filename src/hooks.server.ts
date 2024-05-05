import { getUserBySessionToken } from "$lib/userProfiles/user-profiles-server";
import { error, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const sessionToken = event.cookies.get("__session");

  if (sessionToken) {
    const user = await getUserBySessionToken(sessionToken);
    event.locals.user = user;
  }

  const response = await resolve(event);
  return response;
};
