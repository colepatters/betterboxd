import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { changeOwnDisplayName } from "$lib/userProfiles/user-profiles-server";
import { invalidateAll } from "$app/navigation";

export const load = (async ({ request, locals }) => {
  if (!locals.user) {
    return redirect(301, "/signin");
  }

  return {
    user: locals.user,
  };
}) satisfies PageServerLoad;

export const actions = {
  changeDisplayName: async (event) => {
    const formData = await event.request.formData();
    const displayName = formData.get("displayName");

    // if not, change name
    await changeOwnDisplayName(displayName, event.cookies.get("__session"));

    return;
  },
};
