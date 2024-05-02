<script lang="ts">
  import type { PageData } from './$types';
  import UserProfile from '$lib/components/UserProfile.svelte';
  import JournalEntry from '$lib/components/JournalEntry.svelte';
    
    export let data: PageData;

</script>

<UserProfile userProfile={data.userProfile} />

<div class="flex flex-col items-center w-100 mt-3 space-y-5">
  {#if !Object.values(data.userProfile.journal).length}
    <p>This user has no journal entries</p>
  {/if}
  
  {#each Object.values(data.userProfile.journal) as currentJournalEntry}
    <JournalEntry journalEntry={currentJournalEntry} />
  {/each}
</div>