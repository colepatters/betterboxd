import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  const { userIdToken } = await request.json();

  let res = new Response();
  res.headers.set(
    "Set-Cookie",
    `__session=${userIdToken}; Path=/; HttpOnly; Secure; SameSite=Lax`
  );

  return res;
};
