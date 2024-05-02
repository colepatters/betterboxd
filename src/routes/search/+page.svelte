<script lang="ts">
    import dayjs from 'dayjs'
    
    let searchResults: {}[] = []

    let searchQuery = "Spider Man"

    async function handleSubmit() {
        $page.url.searchParams.set('query', searchQuery)
        goto($page.url)
        search()
    }

    onMount(() => {
        if ($page.url.searchParams.get('query')) {
            search()
        }
    })
    
    async function search() {
        searchResults = []
        loadingSearchResults = true

        const res = await fetch(`/api/search/tmdb?query=${encodeURIComponent(searchQuery)}`)
        searchResults = (await res.json()).results
        loadingSearchResults = false
    }

    import loadingAnimation from '$lib/icons/blocks-shuffle-3.svg'
    import ArrowForward from '$lib/icons/arrow_forward.svelte'
    import MovieListBriefEntry from '$lib/components/movie-list-brief/MovieListBriefEntry.svelte';
    import { goto, invalidateAll } from '$app/navigation';
    import { page } from '$app/stores';
    import { enhance } from '$app/forms';
  import { onMount } from 'svelte';

    let loadingSearchResults = false
    
</script>
<form on:submit|preventDefault={handleSubmit}>    
    <p>Search</p>
    <div class="flex">
        <input type="search" placeholder="Search..." class="input variant-form-material" bind:value={searchQuery} />
        <button type="submit" class="btn btn-icon variant-form-material variant-filled-primary">
            <ArrowForward />
        </button>
    </div>
</form>

<dl class="list-dl w-100 pt-1">
    
    <!-- show placeholder if loading -->
    {#if loadingSearchResults}
        <div>
            <img class="placeholder animate-pulse" src="https://placehold.co/100x150?text=m" style="width: 75px; height: auto;" alt="">
            <span class="flex-auto">
                <dt class="placeholder animate-pulse"></dt>
                <br>
                <dd class="placeholder animate-pulse"></dd>
            </span>
        </div>
    {/if}

    {#each searchResults as result}
        <MovieListBriefEntry entry={result} onClick={() => goto(`/log?movieId=${encodeURIComponent(result.id)}`)} />
    {/each}
</dl>

{#if loadingSearchResults}
    <div style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center">
        <div class="bg-primary-500 rounded-md">
            <img src={loadingAnimation} class="m-8" style="width: 150px;" alt="">
        </div>
    </div>
{/if}