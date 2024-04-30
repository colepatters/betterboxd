import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ request, locals }) => {
  if (!locals.user) {
    return error(401, "Must be signed in to view this page");
  }

  return {
    user: locals.user,
  };
}) satisfies PageServerLoad;
