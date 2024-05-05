<script lang="ts">

    import { AppBar, Avatar, ListBox, ListBoxItem, popup, type PopupSettings } from "@skeletonlabs/skeleton";

	import { onMount } from "svelte";
	import { goto, invalidate, invalidateAll } from "$app/navigation";
  import type { User } from "$lib/types";

    const profileIconDropdown: PopupSettings = {
        event: 'click',
        target: 'profileIconDropdown',
        placement: 'bottom',
    };

	async function signOut() {
		await fetch('/api/auth/signout', {method: 'post'})
		await goto('/')
		invalidateAll()
	}

	export let user: User;

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
				<Avatar initials={user.displayName} background="bg-primary-500" width="w-12" />
			</button>
		{:else}
			<a href="/auth/signin" class="btn variant-filled">sign in</a>
		{/if}
	</svelte:fragment>
</AppBar>

<!-- profile click dropdown -->
{#if user}
	<div class="card p-4 w-72 shadow-xl space-y-2" data-popup="profileIconDropdown">
		<a href="/users/{user.displayName}" class="btn variant-filled w-full">Profile</a>
		<a href="/about" class="btn variant-filled w-full">About betterboxd</a>
		<a href="/account" class="btn variant-filled w-full">Settings</a>
		<a href="" on:click={signOut} class="btn variant-filled-warning w-full">Sign Out</a>
		<div class="arrow bg-surface-100-800-token" />
	</div>
{/if}