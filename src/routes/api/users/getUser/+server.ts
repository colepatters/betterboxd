import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getUserByUID } from "$lib/userProfiles/user-profiles-server";

export const GET: RequestHandler = async ({ url }) => {
  const userUID = url.searchParams.get("useruid");
  const userDisplayName = url.searchParams.get("userdisplayname");

  if (!userUID && !userDisplayName) {
    return error(400, "uid and display name not provided");
  }

  if (!userUID && userDisplayName) {
    return error(400, "searching by display name not implemented yet");
  }

  const userData = await getUserByUID(userUID);
  return json(userData);
};
