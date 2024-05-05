import { serialize } from "v8";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ cookies }) => {
  // console.log("sign out");
  //   cookies.delete("__session", { path: "/" });

  const res = new Response();
  res.headers.set(
    "Set-Cookie",
    `__session=; Path=/; HttpOnly; Secure; SameSite=Lax`
  );
  return res;
};
