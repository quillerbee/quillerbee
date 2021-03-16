<script>
	import { url } from "@roxi/routify";
</script>

<style>
	.logo-link {
		height: 64px;
	}

	.logo {
		left: 5px;
		top: 7px;
	}

	.text-dark-gray {
		color: #14141f;
	}
</style>

<a
	use:$url
	href="/jobs"
	class="flex items-center outline-none pointer-events-auto logo-link">
	<svg class="absolute z-10 text-dark-gray" height="50" width="50">
		<use xlink:href="#hex"></use>
	</svg>
	<svg class="ml-1.5 z-20 w-10 h-10 p-2 rounded-full logo">
		<use xlink:href="#logo"></use>
	</svg>
	<span class="ml-3 -mt-1 text-xl font-semibold text-white">Quiller Bee</span>
</a>
