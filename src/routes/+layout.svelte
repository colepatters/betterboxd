<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import '../app.postcss';

	import type { LayoutData } from './$types';
	export let data: LayoutData

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { AppBar, Avatar, storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<NavBar user={data.user} userProfile={data.userProfile} />
<div class="m-2 flex justify-center">
	<div style="width: 100%; max-width: 750px;">
		<slot />
	</div>
</div>
