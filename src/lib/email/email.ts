import { createTransport, type TransportOptions } from "nodemailer";

import { ENV } from "$env/static/private";
import {
  PROD_EMAIL_HOST,
  PROD_EMAIL_PORT,
  PROD_EMAIL_USERNAME,
  PROD_EMAIL_PASSWORD,
} from "$env/static/private";
import {
  DEV_EMAIL_HOST,
  DEV_EMAIL_PORT,
  DEV_EMAIL_USERNAME,
  DEV_EMAIL_PASSWORD,
} from "$env/static/private";

export async function getTransporter() {
  // create
  let transportConfig = {};
  if (ENV && ENV === "dev") {
    transportConfig = {
      host: DEV_EMAIL_HOST,
      port: parseInt(DEV_EMAIL_PORT),
      auth: {
        user: DEV_EMAIL_USERNAME,
        pass: DEV_EMAIL_PASSWORD,
      },
    };
  } else {
    transportConfig = {
      host: PROD_EMAIL_HOST,
      port: parseInt(PROD_EMAIL_PORT),
      auth: {
        user: PROD_EMAIL_USERNAME,
        pass: PROD_EMAIL_PASSWORD,
      },
    };
  }

  if (!transportConfig)
    return {
      ok: false,
      reason: "could not create transport config",
    };

  const transporter = createTransport(transportConfig);
  // verify

  try {
    await transporter.verify();
  } catch (error) {
    return {
      ok: false,
      reason: "could not verify transporter",
    };
  }

  // return
  return {
    ok: true,
    transporter,
  };
}
