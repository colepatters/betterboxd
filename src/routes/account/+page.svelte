<script lang="ts">
  import UserProfile from '$lib/components/UserProfile.svelte';
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<UserProfile user={data.user} />

<!-- <pre>
    data.user: {JSON.stringify(data.user)}
</pre> -->

<form method="post" action="?/changeDisplayName">
    <p>Change Display Name</p>
    <div class="flex">
        <input type="text" min="4" max="12" class="input variant-form-material" placeholder="" name="displayName" required>
        <button class="btn variant-filled variant-form-material shrink" type="submit">Submit</button>
    </div>
</form>