<script lang="ts">
    import StarEmpty from "$lib/icons/star_empty.svelte";
    import StarFull from "$lib/icons/star_full.svelte";
    import StarHalf from "$lib/icons/star_half.svelte";
        
    import { Ratings } from "@skeletonlabs/skeleton";

    import dayjs from "dayjs";

    export let entry: Movie;
    export let clickable = true;
    export let onClick: () => void | undefined;
    export let showImage = true;
</script>

<button class="" on:click={onClick} disabled={!clickable}>
    <div class="flex">
        {#if showImage}
            {#if entry.poster_path}
                <img class="w-32 object-contain rounded-xl" src={`https://image.tmdb.org/t/p/w500/${entry.poster_path}`} alt="">
            {:else}
                <img class="w-32 object-contain rounded-xl" src="https://placehold.co/500x750/6b6d79/FFFFFF?text={entry.title.slice(0,1)}" alt="">
            {/if}
        {/if}

        <span class="text-left">
            <dt class="h4">
                <strong>{entry.title}</strong>
                {#if entry.release_date}
                    ({dayjs(entry.release_date).format('YYYY')})
                {:else}
                    (TBA)
                {/if}
            </dt>
            <dd>
                {#if entry.overview.length > 150}
                    {entry.overview.slice(0,entry.overview.slice(0,150).lastIndexOf(" ")).trimEnd()}...
                {:else}
                    {entry.overview}
                {/if}

                <!-- <div class="flex justify-between pt-2">
                    {#if entry.release_date}
                        <div>
                            <div>
                                <Ratings value={Math.round( (entry.vote_average/2) * 2 ) / 2} max={5} justify="left" spacing="">
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
                        </div>
                    {/if}
                </div> -->
            </dd>
        </span>
    </div>
</button>