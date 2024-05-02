<script lang="ts">
  import { Avatar } from "@skeletonlabs/skeleton";

    export let userProfile

    let favorites = {};

    for (const [journalEntryId, journalEntry] of Object.entries(userProfile.journal)) {
        if (journalEntry.favorite) {
        favorites[journalEntryId] = journalEntry;
        }
    }
</script>

<div class="flex w-100 bg-surface-500 p-3 rounded-xl space-x-2 justify-between items-center drop-shadow-xl">
    <div class="flex items-center space-x-2 ">
        <Avatar src={userProfile.user.photoURL} width="h-24" />
        <div>
            <h3 class="h3">
                {userProfile.profile.displayName}
            </h3>
            <p class="p">Joined April 2024</p>
        </div>
    
    </div>
    
    <div class="flex space-x-4 text-center mx-2">
        <div>
            <h4 class="h4"><strong>{Object.keys(userProfile.journal).length}</strong></h4>
            logged
        </div>
        
        <div>
            <h4 class="h4"><strong>{Object.keys(favorites).length}</strong></h4>
            favorites
        </div>
    </div>
</div>

