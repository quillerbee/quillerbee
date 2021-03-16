<script>
	import { onMount } from "svelte";
	import { beforeUrlChange, afterPageLoad, metatags } from "@roxi/routify";
	import { Loader, Header, Footer } from "components";

	let showLoader = true;

	$beforeUrlChange((event, store) => {
		return (showLoader = true);
	});

	$afterPageLoad((page) => {
		showLoader = false;
	});

	onMount(() => {
		showLoader = false;
	});

	metatags.title = `Quiller Bee`;
	metatags.description = `One stop destination for hand curated, high quality, jobs from world's most valuable companies!`;
</script>

<Header />

<slot />

{#if showLoader}
	<Loader />
{/if}

<Footer />
