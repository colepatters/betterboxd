<script lang="ts">
  import type { User, JournalEntry, Journal } from "$lib/types";
  import { Avatar } from "@skeletonlabs/skeleton";

    export let user: User

    let favorites = {};

    if (user.journal && Object.keys(user.journal).length) {
        for (const [journalEntryId, journalEntry] of Object.entries(user.journal)) {
            if (journalEntry.favorite) {
            favorites[journalEntryId] = journalEntry;
            }
        }
    }
</script>

<div class="flex w-100 bg-surface-500 text-white p-3 rounded-xl space-x-2 justify-between items-center">
    <div class="flex items-center space-x-2 ">
        <Avatar initials={user.displayName} width="h-24" background="bg-primary-500" />
        <div>
            <h3 class="h3">
                {user.displayName}
            </h3>
            <p class="p">Joined April 2024</p>
        </div>
    
    </div>
    
    <div class="flex space-x-4 text-center mx-2">
        <div>
            <h4 class="h4"><strong>{user.journal && Object.keys(user.journal).length? Object.keys(user.journal).length : 0}</strong></h4>
            logged
        </div>
        
        <div>
            <h4 class="h4"><strong>{Object.keys(favorites).length}</strong></h4>
            favorites
        </div>
    </div>
</div>

