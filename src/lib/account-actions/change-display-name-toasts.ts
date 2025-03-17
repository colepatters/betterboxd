import type { ToastSettings } from "@skeletonlabs/skeleton";

export const changeDisplayNameRequest: ToastSettings = {
  message: "Changing display name",
  classes: "animate-pulse",
  autohide: false,
  hideDismiss: true,
};

export const changeDisplayNameSuccess: ToastSettings = {
  message: "Changed display name",
  background: "variant-filled-success",
};

export function changeDisplayNameError(errorMessage: string): ToastSettings {
  return {
    message: `Unable to change display name: ${errorMessage}`,
    background: "variant-filled-error",
  };
}
