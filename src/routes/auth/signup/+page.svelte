<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<div class="flex flex-col items-center space-y-4">
    <form action="?/emailSignup" method="post" class="space-y-2 w-full">
        <input class="input variant-material" name="email" type="text" placeholder="email" required>
        <input class="input variant-material" name="displayName" type="text" placeholder="display name" required>
        <input class="input variant-material" name="password" type="password" placeholder="password" required>
        <button class="btn variant-filled-primary w-full">Sign up</button>
    </form>
</div>