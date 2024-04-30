import {
  getUserProfileByDisplayName,
  getUserProfileByUID,
} from "$lib/userProfiles";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
  const user = await getUserProfileByDisplayName(params.userDisplayName);

  return {
    user,
  };
}) satisfies PageServerLoad;
