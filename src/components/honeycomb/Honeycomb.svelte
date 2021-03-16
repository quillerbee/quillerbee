<script>
	import Hex from "./Hex.svelte";
</script>

<style>
	/* https://codepen.io/uiswarup/pen/dyyqaGR */

	.beehive .honeycomb:not(:first-child) {
		margin-top: -29px;
	}

	@media screen and (min-width: 450px) {
		nav section {
			padding: 25px;
		}
	}
</style>

<nav>
	<section class="py-10 mb-10 overflow-hidden text-gray-900 beehive">
		<div class="relative flex justify-center honeycomb">
			<Hex
				classes="relative hex focus:outline-none"
				title="Startups"
				icon="#rocket" />
			<Hex
				classes="relative hidden lg:block hex focus:outline-none"
				title="Game Dev"
				icon="#gamepad" />
			<Hex
				classes="relative hex focus:outline-none"
				title="Remote"
				icon="#laptop-house" />
			<Hex
				classes="relative hidden lg:block hex focus:outline-none"
				title="Design"
				icon="#paint-brush" />
			<Hex
				classes="relative focus:outline-none hex"
				title="Support"
				icon="#headset" />
		</div>
		<div class="relative flex justify-center honeycomb">
			<Hex classes="relative hex focus:outline-none" />
			<Hex classes="relative hidden hex lg:block focus:outline-none" />
			<Hex classes="relative hidden hex lg:block focus:outline-none" />
			<Hex classes="relative hex focus:outline-none" />
		</div>
	</section>
</nav>
