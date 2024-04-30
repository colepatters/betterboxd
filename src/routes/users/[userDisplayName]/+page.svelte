<script lang="ts">
    import { Avatar } from '@skeletonlabs/skeleton';
import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<div class="flex items-center space-x-2 w-100 bg-surface-500 p-3 rounded">
    <Avatar src={data.user.photoURL} width="h-24" />
    <div>
        <h3 class="h3">
            {data.user.displayName}
        </h3>
        <p class="p">Joined April 2024</p>
    </div>
</div>