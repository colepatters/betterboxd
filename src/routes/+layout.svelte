<script lang="ts">
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { AppBar, Avatar, storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end" padding="p-2">
	<svelte:fragment slot="lead">
		<a href="/">
			<h3 class="h3">betterboxd</h3>
		</a>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<a href="/search">Search</a>
		<button>
			<Avatar initials="US" background="bg-primary-500" width="w-12" />
		</button>
	</svelte:fragment>
</AppBar>
<div class="m-2 flex w-100 justify-center">
	<div style="max-width: 750px; width: 100%">
		<slot />
	</div>
</div>
