<script lang="ts">
  import HeartFilled from '$lib/icons/heart_filled.svelte';
  import StarEmpty from '$lib/icons/star_empty.svelte';
  import StarFull from '$lib/icons/star_full.svelte';
  import StarHalf from '$lib/icons/star_half.svelte';
    import type { JournalEntry } from '$lib/types'
  import { Ratings, getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
  import dayjs from 'dayjs';
  import { onMount } from 'svelte';
  import { crossfade, fade, scale } from 'svelte/transition';

    export let journalEntry: JournalEntry;

    let movie: MovieFullDetails | null = null;
    onMount(() => {
        fetch(`/api/tmdb/getMovie?movieId=${journalEntry.movieId}`).then((res) => {
            res.json().then((data) => {
                movie = data as MovieFullDetails
            })
        })
    })

    const modalStore = getModalStore()

    function triggerModal() {
        const modal: ModalSettings = {
            type: 'component',
            component: 'journalEntry',
            meta: {
                movie, journalEntry
            }
        }
        modalStore.trigger(modal)
    }

</script>

<div class="w-full">
    {#if !movie}
        <!-- placeholder -->
        <div>
            <div class="flex items-center space-x-2">
                <img class="w-32 object-contain animate-pulse rounded-xl" src="https://placehold.co/500x750/6b6d79/FFFFFF?text=betterboxd" alt="">
                <div class="flex-auto space-y-2">
                    <dt class="placeholder animate-pulse w-64"></dt>
                    <dd class="placeholder animate-pulse"></dd>
                </div>
            </div>
        </div>
    {/if}
    
    {#if movie}
        <button class="btn w-full text-wrap text-left p-0" transition:fade on:click={triggerModal}>
            <div class="flex items-between space-x-4 w-full">
                <img class="w-32 object-contain rounded-md" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="">
                <div class="flex flex-col justify-between my-4 w-full">
                    <dt><strong>{movie.title} ({dayjs(movie.release_date).format('YYYY')})</strong></dt>
                    {#if journalEntry.review}
                        <dd><i>
                            <!-- limit shown text -->
                            {#if journalEntry.review.length > 125}
                                "{journalEntry.review.slice(0,journalEntry.review.slice(0,125).lastIndexOf(" ")).trimEnd()}...
                            {:else}
                                "{journalEntry.review}"
                            {/if}
                        </i></dd>
                    {/if}
                    <div class="flex items-center justify-between mt-2 flex-wrap">
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
                        <div class="text-nowrap mt-2">
                            {journalEntry.dateWatched}
                        </div>
                    </div>
                </div>
            </div>
        </button>
    {/if}
</div>