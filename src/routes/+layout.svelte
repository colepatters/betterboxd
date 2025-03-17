<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import '../app.postcss';

	import type { LayoutData } from './$types';
	export let data: LayoutData

	import { autoModeWatcher, initializeStores, Modal, type ModalComponent } from '@skeletonlabs/skeleton';
	initializeStores();
	
	import JournalEntryModal from '$lib/components/JournalEntryModal.svelte';
	const modalRegistry: Record<string, ModalComponent> = {
		journalEntry: { ref: JournalEntryModal },
	};

	import { Toast } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { AppBar, Avatar, storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<svelte:head>{@html '<script>(' + autoModeWatcher.toString() + ')();</script>'}</svelte:head>

<Modal components={modalRegistry} />
<Toast />

<NavBar user={data.user} userProfile={data.userProfile} />

<div class="m-2 flex justify-center">
	<div class="" style="width: 100%; max-width: 750px;">
		<slot />
	</div>
</div>
