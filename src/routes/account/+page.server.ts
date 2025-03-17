import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import {
  changeOwnDisplayName,
  validateSessionToken,
} from "$lib/userProfiles/user-profiles-server";
import { sendPasswordResetEmail } from "$lib/account-actions/password-reset";

export const load = (async ({ request, locals, cookies }) => {
  if (!locals.user) {
    return redirect(301, "/signin");
  }

  return {
    user: locals.user,
    sessionToken: cookies.get("__session"),
  };
}) satisfies PageServerLoad;

export const actions = {
  changeDisplayName: async (event) => {
    const formData = await event.request.formData();
    const displayName = formData.get("displayName");

    // if not, change name
    await changeOwnDisplayName(displayName, event.cookies.get("__session"));

    return {
      action: "changeDisplayName",
      ok: true,
    };
  },

  resetPassword: async ({ cookies }) => {
    // await new Promise((resolve, reject) => {
    //   setTimeout(resolve, 2000);
    // });

    const sessionValid = validateSessionToken(cookies.get("__session"));
    if (!sessionValid)
      return {
        action: "resetPassword",
        ok: false,
        reason: "session invalid",
      };

    const res = await sendPasswordResetEmail(cookies.get("__session"));

    return {
      action: "resetPassword",
      ok: true,
    };
  },
};
