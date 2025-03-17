import { getTransporter } from "$lib/email/email";
import {
  getUserBySessionToken,
  getUserCredentialsBySessionToken,
} from "$lib/userProfiles/user-profiles-server";
import type { ToastSettings } from "@skeletonlabs/skeleton";
import type { MailOptions } from "nodemailer/lib/smtp-transport";

export async function sendPasswordResetEmail(sessionToken: string) {
  // todo: validate session token

  //   const user = await getUserBySessionToken(sessionToken);
  const userCredentialsRes = await getUserCredentialsBySessionToken(
    sessionToken
  );
  console.log("user credentials", userCredentialsRes.userCredentials);

  if (!userCredentialsRes.ok)
    return {
      ok: false,
      reason: `user credentials could not be found: ${userCredentialsRes.reason}`,
    };

  const userCredentials = userCredentialsRes.userCredentials!;

  const transporterRes = await getTransporter();
  if (!transporterRes.ok)
    return {
      ok: false,
      reason: `transporter could not be created: ${transporterRes.reason}`,
    };

  const transporter = transporterRes.transporter!;

  const mail: MailOptions = {
    to: userCredentials.email,
    from: "noreply@betterboxd.app",
    html: "test",
  };

  await transporter.sendMail(mail);

  return;
}
