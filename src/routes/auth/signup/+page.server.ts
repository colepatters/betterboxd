import type { PageServerLoad } from "./$types";

import { emailSignup } from "$lib/auth/server-auth";
import { error, redirect } from "@sveltejs/kit";

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

export const actions = {
  emailSignup: async ({ request }) => {
    const formData = await request.formData();

    const email = formData.get("email");
    const displayName = formData.get("displayName");
    const password = formData.get("password");

    if (!email || !displayName || !password) {
      return error(500, "formdata incomplete");
    }

    console.log(email, displayName, password);
    const signupStatus = await emailSignup(email, displayName, password);

    if (!signupStatus.ok) {
      return error(400, signupStatus.reason);
    }

    redirect(301, "/auth/signin");
  },
};
