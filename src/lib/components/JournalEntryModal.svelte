<script lang="ts">
    import dayjs from "dayjs";
    import { fade } from "svelte/transition";
    import JournalEntry from "./JournalEntry.svelte";
    import HeartFilled from "$lib/icons/heart_filled.svelte";
    import { Ratings, getModalStore } from "@skeletonlabs/skeleton";
    import StarEmpty from "$lib/icons/star_empty.svelte";
    import StarHalf from "$lib/icons/star_half.svelte";
    import StarFull from "$lib/icons/star_full.svelte";
    import { onMount } from "svelte";
    import MovieDetails from "./MovieDetails.svelte";
    import { getStores } from "$app/stores";
    import Close from "$lib/icons/close.svelte";

    export let movie: MovieFullDetails
    let journalEntry: JournalEntry

    const modalStore = getModalStore()

    onMount(() => {
        movie = $modalStore[0].meta.movie
        journalEntry = $modalStore[0].meta.journalEntry
    })

    function closeModal() {
        modalStore.close()
    }

    import { page } from "$app/stores";

    const userDisplayName = $page.params.userDisplayName

    export let ownProfile: boolean;
</script>

{#if movie && journalEntry}
<div class="bg-surface-500 text-white p-4 rounded-xl overflow-auto" style="width: 100%; max-width: 750px; max-height: 100vh">
    <header class="flex justify-end justify-end mb-3">
        <button class="btn btn-icon" on:click={closeModal}>
            <Close size={24} />
        </button>
    </header>
    
    <div class="bg-surface-700 p-4 rounded flex flex-col justify-center mb-4">
        {#if movie}
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} class="rounded-md mb-2"  alt="">
            <MovieDetails entry={movie} showFullDescription clickable={false} showImage={false} showLinks />
        {:else}
            <a class="btn variant-filled-primary w-full" href="/search">Search for a movie</a>
        {/if}
    </div>

    {#if userDisplayName}
        <h3 class="h3">{userDisplayName}'s review</h3>
    {/if}

    {#if journalEntry.review}
        <dd style="max-height:100%"><i>
            "{journalEntry.review}"
        </i></dd>
    {/if}
    <div class="flex items-between space-x-4">
            <div class="flex flex-col justify-between my-4 w-full">

                <div class="flex items-center justify-between mt-2 w-full">
                    <div class="flex items-center">
                        <div>
                            {#if journalEntry.favorite}
                                <div class="me-2" style="margin-bottom: -1px;">
                                    <HeartFilled size={24} color="#ff1100" />
                                </div>
                            {/if}
                        </div>
                        <div class="w-min">
                            <Ratings value={journalEntry.rating} max={5}>
                                <svelte:fragment slot="empty">
                                    <StarEmpty size={24} />
                                </svelte:fragment>
                                <svelte:fragment slot="half">
                                    <StarHalf size={24} />
                                </svelte:fragment>
                                <svelte:fragment slot="full">
                                    <StarFull size={24} />
                                </svelte:fragment>
                            </Ratings>
                        </div>
                    </div>

                    <div>
                        {journalEntry.dateWatched}
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}