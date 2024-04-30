import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals }) => {
  const { user, userProfile } = locals;

  return {
    user,
    userProfile,
  };
}) satisfies LayoutServerLoad;
