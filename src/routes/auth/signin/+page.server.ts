import { emailSignin } from "$lib/auth/server-auth";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

export const actions = {
  emailSignin: async ({ request, cookies }) => {
    const formData = await request.formData();

    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password)
      return error(400, "Please fill out all the fields");

    const res = await emailSignin(email, password);

    if (!res.ok) return error(400, res.reason);

    cookies.set("__session", res.sessionToken, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    redirect(301, "/");
  },
};
