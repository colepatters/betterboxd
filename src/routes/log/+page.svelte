<script lang="ts">
    import { Ratings } from '@skeletonlabs/skeleton';
    import type { PageData } from './$types';
    
    import StarEmpty from '$lib/icons/star_empty.svelte';
    import StarHalf from '$lib/icons/star_half.svelte';
    import StarFull from '$lib/icons/star_full.svelte';
    import Heart from '$lib/icons/heart_filled.svelte'

    import dayjs from 'dayjs';
    import MovieDetails from '$lib/components/MovieDetails.svelte';

    let watchedDate = ""
    let userRatingValue = 3.5
    
    export let data: PageData;
</script>

<h2 class="h1 pb-3">
    New Entry
</h2>

<!-- movie details -->
<div class="bg-surface-500 p-3 rounded flex flex-col justify-center">
    {#if data.movie}
        <img src={`https://image.tmdb.org/t/p/original/${data.movie.backdrop_path}`} class="rounded-md mb-2"  alt="">
        <MovieDetails entry={data.movie} showFullDescription clickable={false} showImage={false} showLinks />
    {:else}
        <a class="btn variant-filled-primary w-full" href="/search">Search for a movie</a>
    {/if}
</div>

<form class="pt-2 space-y-1">
    <div class="flex justify-between">
        <label class="items-center">
            <p>Date Watched (optional)</p>
            <input class="input variant-form-material" type="date" name="" id="" value={dayjs().format("YYYY-MM-DD")}>
        </label>
        
        <label class="text-center space-x-2">
            <p class="mb-2">Watched Before</p>
            <input class="input checkbox variant-form-material" type="checkbox" checked />
        </label>
    </div>
    
    <label class="flex-auto">
		<p>Review (optional)</p>
        <textarea class="textarea variant-form-material" rows="4" placeholder="Write your review here" />
	</label>
    
    <div class="w-100 flex justify-between">
        <div style="width: min-content;">
            <p>Your Rating</p>
            <Ratings value={userRatingValue} max={5}>
                <svelte:fragment slot="empty">
                    <StarEmpty size={48} />
                </svelte:fragment>
                <svelte:fragment slot="half">
                    <StarHalf size={48} />
                </svelte:fragment>
                <svelte:fragment slot="full">
                    <StarFull size={48} />
                </svelte:fragment>
            </Ratings>
            <input class="input variant-form-material" type="range" name="" id="" max="5" min="0" step="0.5" bind:value={userRatingValue}>
        </div>

        <div class="flex flex-col justify-center">
            <p class="flex-none w-100 text-center">Favorite</p>
            
            <button type="button" class="btn flex-1 m-0">
                <Heart size={50} />
            </button>
        </div>

    </div>

    <br>

    <button type="submit" class="btn variant-filled-primary variant-form-material w-full">Submit</button>
</form>