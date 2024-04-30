import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getUserProfileByUID } from "$lib/userProfiles";

export const GET: RequestHandler = async ({ url }) => {
  const userUID = url.searchParams.get("useruid");
  const userDisplayName = url.searchParams.get("userdisplayname");

  if (!userUID && !userDisplayName) {
    return error(400, "uid and display name not provided");
  }

  if (!userUID && userDisplayName) {
    return error(400, "searching by display name not implemented yet");
  }

  const userData = await getUserProfileByUID(userUID);
  return json(userData);
};
