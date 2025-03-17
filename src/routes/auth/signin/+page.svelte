<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<div class="flex flex-col items-center space-y-4">
    <form action="?/emailSignin" method="post" class="space-y-2 w-full">
        <input class="input variant-material" name="email" type="email" placeholder="email">
        <input class="input variant-material" name="password" type="password" placeholder="password">
        <button class="btn variant-filled-primary w-full">Sign in</button>
        <button class="btn variant-filled w-full">Use a passkey</button>
    </form>
    
    <hr class="w-3/6">
    
    <div class="flex justify-center mt-2">
        <a href="/auth/signup" class="btn variant-filled w-full">Sign up</a>
    </div>
</div>