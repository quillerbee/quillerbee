<script>
	import { onMount } from "svelte";
	import "@pwabuilder/pwainstall";

	let pwaInstaller;

	onMount(() => {
		pwaInstaller.showopen = true;
		pwaInstaller.installbuttontext = "Install";
		pwaInstaller.explainer =
			"This app can be installed on your PC or mobile, which will allow this web app to look like any other app. You will find it in your app lists and be able to pin it as well.";
		pwaInstaller.descriptionheader = "Quiller Bee Lite";
	});
</script>

<style>
	pwa-install::part(openButton) {
		font-size: 16px;
		font-weight: 600;
		color: #fff;
		cursor: pointer;
		pointer-events: all;
		height: 40px;
		width: auto;
		padding: 0 20px;
		text-align: center;
		border: none;
		background-size: 300% 100%;
		border-radius: 50px;
		moz-transition: all 0.4s ease-in-out;
		-o-transition: all 0.4s ease-in-out;
		-webkit-transition: all 0.4s ease-in-out;
		transition: all 0.4s ease-in-out;
	}

	pwa-install::part(openButton):hover {
		background-position: 100% 0;
		moz-transition: all 0.4s ease-in-out;
		-o-transition: all 0.4s ease-in-out;
		-webkit-transition: all 0.4s ease-in-out;
		transition: all 0.4s ease-in-out;
	}

	pwa-install::part(openButton) {
		background-image: linear-gradient(
			to right,
			#667eea,
			#764ba2,
			#6b8dd6,
			#8e37d7
		);
		box-shadow: 0 4px 15px 0 rgba(116, 79, 168, 0.75);
	}

	pwa-install::part(openButton) {
		position: absolute;
		bottom: -20px;
		right: 23%;
	}

	pwa-install::part(openButton):focus {
		outline: none;

		--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
			var(--tw-ring-offset-width) var(--tw-ring-offset-color);
		--tw-ring-shadow: var(--tw-ring-inset) 0 0 0
			calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
		box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
			var(--tw-shadow, 0 0 #0000);
		--tw-ring-opacity: 1;
		--tw-ring-color: rgba(129, 140, 248, var(--tw-ring-opacity));
	}
</style>

<pwa-install bind:this="{pwaInstaller}"></pwa-install>
