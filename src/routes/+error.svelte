<script lang="ts">
    import { page } from '$app/stores';
</script>

<div class="mt-4">
    <h1 class="h1">Whoops! ({$page.status})</h1>
    <h3 class="h3">{$page.error?.message}</h3>
</div>