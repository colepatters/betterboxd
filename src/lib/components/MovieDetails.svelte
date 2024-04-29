<script lang="ts">
    import StarEmpty from "$lib/icons/star_empty.svelte";
    import StarFull from "$lib/icons/star_full.svelte";
    import StarHalf from "$lib/icons/star_half.svelte";

    import imdbLogo from '$lib/icons/IMDb_3_2_Logo_BLK.png'
    
    import { Ratings } from "@skeletonlabs/skeleton";

    import dayjs from "dayjs";

    export let entry: MovieFullDetails;
    export let clickable = true;
    export let onClick: () => void | undefined;
    export let showFullDescription = false
    export let showImage = true;
    export let showLinks = false;
</script>

<button class="w-full" on:click={onClick} disabled={!clickable}>
    <div class="flex">
        {#if showImage}
            {#if entry.poster_path}
                <img class="w-32 object-contain" src={`https://image.tmdb.org/t/p/w500/${entry.poster_path}`} alt="">
            {:else}
                <img src="https://placehold.co/100x150?text={entry.title.slice(0,1)}" style="width: 75px; height: auto;" alt="">
            {/if}
        {/if}

        <span class="flex-auto text-left self-center ps-2" >
            <dt class="h4">
                <strong>{entry.title}</strong>
                {#if entry.release_date}
                    ({dayjs(entry.release_date).format('YYYY')})
                {:else}
                    (TBA)
                {/if}
            </dt>
            <dd>
                {#if entry.overview.length > 150 && !showFullDescription}
                    {entry.overview.slice(0,entry.overview.slice(0,150).lastIndexOf(" ")).trimEnd()}...
                {:else}
                    {entry.overview}
                {/if}

                <div class="flex justify-between pt-1">
                    {#if entry.release_date}
                    <div class="flex gap-1">
                        <div class="self-center" style="width: min-content;">
                            <Ratings value={Math.round( (entry.vote_average/2) * 2 ) / 2} max={5} justify="left">
                                <svelte:fragment slot="empty">
                                    <StarEmpty />
                                </svelte:fragment>
                                <svelte:fragment slot="half">
                                    <StarHalf />
                                </svelte:fragment>
                                <svelte:fragment slot="full">
                                    <StarFull />
                                </svelte:fragment>
                            </Ratings>
                        </div>
                        <span style="margin-bottom: -2px; align-self:center;">({entry.vote_count})</span>
                    </div>
                    {/if}

                    {#if showLinks}
                        <div>
                            {#if entry.imdb_id}
                                <a class="btn variant-filled-warning" href="https://www.imdb.com/title/{entry.imdb_id}" target="_blank">
                                    <img class="w-8 object-contain" src={imdbLogo} alt="">
                                </a>
                            {/if}
                        </div>
                    {/if}
                </div>
            </dd>
        </span>
    </div>
</button>