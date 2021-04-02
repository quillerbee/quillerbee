<script>
	import { onMount } from "svelte";
	import tippy from "sveltejs-tippy";
	import autosize from "autosize";

	import {
		nameTooltip,
		emailTooltip,
		websiteTooltip,
		aboutTooltip,
	} from "@forms/tooltips";

	let textarea;

	onMount(() => {
		autosize(textarea);
	});
</script>

<form
	on:submit|preventDefault
	class="relative flex flex-col px-4 py-5 mb-6 space-y-6 text-white transition-shadow duration-300 ease-in-out bg-gray-900 rounded-lg sm:p-6 hover:shadow-lg ribbon-container">
	<span class="ribbon left"> Company </span>
	<div class="absolute left-0 flex justify-center w-full -top-16">
		<div class="flex items-center mt-1">
			<div
				class="flex justify-center items-center mb-5 text-4xl font-bold text-center text-gray-900 bg-pink-400 rounded-full w-[75px] h-[75px]">
				D
			</div>
		</div>
	</div>
	<div></div>
	<div class="grid grid-flow-row grid-cols-3 grid-rows-1 gap-x-4 gap-y-6">
		<div>
			<label
				for="name"
				class="inline-flex items-center text-sm font-medium text-gray-300 cursor-pointer focus:outline-none"
				tabindex="0"
				use:tippy="{nameTooltip}">
				Name
				<svg width="15" height="15" class="text-[#fc0] ml-1 -mt-0.5">
					<use xlink:href="#information-circle"></use>
				</svg>
			</label>
			<input
				type="text"
				id="name"
				name="name"
				autocomplete="name"
				placeholder="Company Name"
				class="block w-full mt-1 bg-gray-800 border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
		</div>

		<div>
			<label
				for="email"
				class="inline-flex items-center text-sm font-medium text-gray-300 cursor-pointer focus:outline-none"
				tabindex="0"
				use:tippy="{emailTooltip}">
				Email
				<svg width="15" height="15" class="text-[#fc0] ml-1 -mt-0.5">
					<use xlink:href="#information-circle"></use>
				</svg>
			</label>
			<input
				id="email"
				type="text"
				inputmode="email"
				name="email"
				autocomplete="email"
				placeholder="you@example.com"
				class="block w-full mt-1 bg-gray-800 border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
		</div>

		<div>
			<label
				for="website"
				class="inline-flex items-center text-sm font-medium text-gray-300 cursor-pointer focus:outline-none"
				tabindex="0"
				use:tippy="{websiteTooltip}">
				Website
				<svg width="15" height="15" class="text-[#fc0] ml-1 -mt-0.5">
					<use xlink:href="#information-circle"></use>
				</svg>
			</label>
			<input
				type="text"
				inputmode="url"
				id="website"
				name="website"
				class="flex-1 block w-full mt-1 bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				placeholder="https://example.com" />
			<p class="hidden mt-2 text-xs text-gray-400">
				It is mandatory to have a website for a company posting jobs
				with us, and it must be served over https!
			</p>
		</div>
	</div>

	<div>
		<label
			for="about"
			class="inline-flex items-center text-sm font-medium text-gray-300 cursor-pointer focus:outline-none"
			tabindex="0"
			use:tippy="{aboutTooltip}">
			About
			<svg width="15" height="15" class="text-[#fc0] ml-1 -mt-0.5">
				<use xlink:href="#information-circle"></use>
			</svg>
		</label>
		<textarea
			id="about"
			name="about"
			rows="3"
			bind:this="{textarea}"
			class="block w-full mt-1 bg-gray-800 border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			placeholder="Describe your Company, but keep it short."></textarea>
	</div>

	<div class="py-3 text-right">
		<button
			type="submit"
			class="inline-flex justify-center px-4 py-2 mr-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md shadow-sm outline-none hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
			Cancel
		</button>
		<button
			type="submit"
			class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
			Save
		</button>
	</div>
</form>
