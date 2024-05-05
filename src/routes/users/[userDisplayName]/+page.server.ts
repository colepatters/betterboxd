import { getUserByDisplayName } from "$lib/userProfiles/user-profiles-server";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
  const userRes = await getUserByDisplayName(params.userDisplayName);

  if (!userRes.ok) return error(400, userRes.reason);

  return {
    user: userRes.profile,
  };
}) satisfies PageServerLoad;
