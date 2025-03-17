import {
  getUserByDisplayName,
  getUserUIDFromDisplayName,
  getUserUIDFromSessionToken,
} from "$lib/userProfiles/user-profiles-server";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, cookies }) => {
  const userRes = await getUserByDisplayName(params.userDisplayName);

  if (
    !userRes.ok &&
    userRes.reason === "could not find user with display name"
  ) {
    return error(404, "Could not find user with the requested display name");
  }
  if (!userRes.ok) return error(500, userRes.reason);

  let ownProfile = false;
  if (cookies.get("__session")) {
    const ownUIDRes = await getUserUIDFromSessionToken(
      cookies.get("__session")!
    );

    const userUIDRes = await getUserUIDFromDisplayName(
      userRes.profile!.displayName
    );

    if (ownUIDRes.ok && userUIDRes.ok && ownUIDRes.uid === userUIDRes.uid) {
      ownProfile = true;
    }
  }

  return {
    user: userRes.profile,
    ownProfile,
  };
}) satisfies PageServerLoad;
