<script lang="ts">

    import { AppBar, Avatar, ListBox, ListBoxItem, popup, type PopupSettings } from "@skeletonlabs/skeleton";

    import { popupSignin } from "$lib/firebase-client";
  import { onMount } from "svelte";

    const profileIconDropdown: PopupSettings = {
        // Represents the type of event that opens/closed the popup
        event: 'click',
        // Matches the data-popup value on your popup element
        target: 'profileIconDropdown',
        // Defines which side of your trigger the popup will appear
        placement: 'bottom',
    };

    async function signin() {
        const res = await popupSignin()
        console.log(res)
    }

	export let user;
	export let userProfile;

</script>
<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end" padding="p-2">
	<svelte:fragment slot="lead">
		<a href="/">
			<h3 class="h3">betterboxd</h3>
		</a>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<a href="/search">Search</a>
		{#if user}
			<button use:popup={profileIconDropdown}>
				<Avatar src="{user.picture}" background="bg-primary-500" width="w-12" />
			</button>
		{:else}
			<button on:click={signin} class="h-12">sign in</button>
		{/if}
	</svelte:fragment>
</AppBar>

<!-- profile click dropdown -->
{#if user}
	<div class="card p-4 w-72 shadow-xl space-y-2" data-popup="profileIconDropdown">
		<a href="/users/{userProfile.display_name}" class="btn variant-filled w-full">Profile</a>
		<a href="" class="btn variant-filled w-full">Journal</a>
		<a href="/about" class="btn variant-filled w-full">About betterboxd</a>
		<a href="/account" class="btn variant-filled w-full">Settings</a>
		<a href="" class="btn variant-filled-warning w-full">Sign Out</a>
		<div class="arrow bg-surface-100-800-token" />
	</div>
{/if}