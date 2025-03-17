import {
  getUserBySessionToken,
  getUserUIDFromSessionToken,
} from "$lib/userProfiles/user-profiles-server";

export async function emailSignin() {}

export async function signOut() {
  await fetch("/api/auth/signout");
  return;
}

export async function createPasskey(sessionToken: string) {
  const user = await getUserBySessionToken(sessionToken);
  const userUID = await getUserUIDFromSessionToken(sessionToken);

  const publicKeyCredentialCreationOptions = {
    rp: {
      name: "betterboxd",
      id: "betterboxd.app",
    },
    user: {
      id: userUID,
      name: user.profile.displayName,
      displayName: user.profile.displayName,
    },
    pubKeyCredParams: [
      { alg: -7, type: "public-key" },
      { alg: -257, type: "public-key" },
    ],
  };

  const credential = await navigator.credentials.create({
    publicKey: publicKeyCredentialCreationOptions,
  });

  console.log(credential);

  return credential;
}
