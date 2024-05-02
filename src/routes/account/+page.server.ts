import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import {
  changeOwnDisplayName,
  checkDisplayNameTaken,
  validateDisplayName,
} from "$lib/userProfiles";

export const load = (async ({ request, locals }) => {
  if (!locals.user) {
    return error(401, "Must be signed in to view this page");
  }

  return {
    user: locals.user,
  };
}) satisfies PageServerLoad;

export const actions = {
  changeDisplayName: async (event) => {
    const formData = await event.request.formData();
    const displayName = formData.get("displayName");

    // check if valid
    const valid = validateDisplayName(displayName);
    if (!valid.valid) return error(400, valid.reason);

    // check if display name is already taken
    const taken = await checkDisplayNameTaken(displayName);

    // error if username already taken
    if (taken) {
      return error(500, "username taken");
    }

    // if not, change name
    await changeOwnDisplayName(displayName, event.cookies.get("__session"));

    return;
  },
};
