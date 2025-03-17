import type { ToastSettings } from "@skeletonlabs/skeleton";

export const passwordResetSendingToast: ToastSettings = {
  message: "Sending password reset email",
  classes: "animate-pulse",
  autohide: false,
  hideDismiss: true,
};

export const passwordResetSentSuccessToast: ToastSettings = {
  message: "Password reset email sent",
  background: "variant-filled-success",
};

export function passwordResetSentErrorToast(
  errorMessage: string
): ToastSettings {
  return {
    message: `Unable to send password reset email: ${errorMessage}`,
    background: "variant-filled-error",
  };
}
