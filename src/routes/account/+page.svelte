<script lang="ts">
  import UserProfile from '$lib/components/UserProfile.svelte';
  import { LightSwitch, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
    import type { ActionData, PageData } from './$types';
  import { passwordResetSendingToast, passwordResetSentErrorToast, passwordResetSentSuccessToast } from '$lib/account-actions/password-reset-toasts';
  import { onMount } from 'svelte';
  import { changeDisplayNameError, changeDisplayNameRequest, changeDisplayNameSuccess } from '$lib/account-actions/change-display-name-toasts';
  import { invalidateAll } from '$app/navigation';
    
    export let data: PageData;
    export let form: ActionData;

    const toastStore = getToastStore()

    onMount(() => {
        if (form) {
            switch (form.action) {
                case 'changeDisplayName': 
                    if (form.ok) {
                        toastStore.trigger(changeDisplayNameSuccess)
                        invalidateAll()
                    } else {
                        toastStore.trigger(changeDisplayNameError(form.reason))
                    }
                    break
                case 'resetPassword':
                    if (form.ok) {
                        toastStore.trigger(passwordResetSentSuccessToast)
                    } else {
                        toastStore.trigger(passwordResetSentErrorToast(form.reason))
                    }
                    break
            }

        }
    })


</script>

<UserProfile user={data.user} />

<pre>
    {JSON.stringify(form)}
</pre>
<h2 class="h2">Account</h2>
<div class="space-y-4">
    <div>
        <h3 class="h3">App preferences</h3>
        <div>
            <p>Color theme</p>
            <LightSwitch />
        </div>
    </div>

    <div class="">
        <h3 class="h3">Profile</h3>
        <form method="post" action="?/changeDisplayName" on:submit={() => toastStore.trigger(changeDisplayNameRequest)}>
            <p>Change Display Name</p>
            <div class="flex">
                <input type="text" min="4" max="12" class="input variant-form-material" placeholder="" name="displayName" required>
                <button class="btn variant-filled variant-form-material shrink" type="submit">Submit</button>
            </div>
        </form>
    </div>

    <div class="space-y-2">
        <h3 class="h3">Authentication</h3>
        <!-- <form action="" method="post">
            <p>Add a passkey</p>
            <button class="btn btn-icon variant-filled" type="button" on:click={() => addPasskey()}>+</button>
        </form> -->

        <form method="post" action="?/resetPassword" on:submit={() => toastStore.trigger(passwordResetSendingToast)}>
            <button class="btn variant-filled" type="submit">Request password reset link</button>
        </form>
    </div>
</div>