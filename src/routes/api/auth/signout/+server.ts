import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, cookies }) => {
  cookies.delete("__session", { path: "/" });

  return new Response();
};
