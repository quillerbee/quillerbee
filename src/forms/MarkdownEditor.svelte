<script>
	import { onMount } from "svelte";
	import marked from "marked";
	import autosize from "autosize";
	import tippy from "sveltejs-tippy";

	export let data,
		errors,
		maxLength = 1000,
		rows = 8,
		tooltip = "";

	let textarea,
		isEditMode = true;

	onMount(() => {
		autosize(textarea);
	});
</script>

<style>
	textarea {
		resize: vertical;
		max-height: 50vh;
	}
</style>

<div class="relative">
	<label
		for="description"
		class="inline-flex items-center text-sm font-medium text-gray-300 cursor-pointer focus:outline-none"
		use:tippy="{tooltip}">
		Description
		<svg width="15" height="15" class="text-[#fc0] ml-1 -mt-0.5">
			<use xlink:href="#information-circle"></use>
		</svg>
	</label>
	<div class="mt-1">
		<textarea
			id="description"
			name="description"
			rows="{rows}"
			bind:this="{textarea}"
			bind:value="{$data.description}"
			class="{`w-full bg-gray-800 rounded-md shadow-sm sm:text-sm text-gray-200
            ${
				$errors.description
					? 'border-red-500 ring-1 ring-red-500 focus:ring-red-500 focus:border-red-500'
					: 'border-gray-700 focus:ring-indigo-500 focus:border-indigo-500'
			}
            ${isEditMode ? 'rounded-bl-none block' : 'hidden'}`}"
			placeholder="Describe the Job Eloquently."></textarea>
		<article
			class="{`mdv min-h-[178px] max-h-[50vh] overflow-auto prose px-3 py-2 min-w-full border bg-gray-800 rounded-md shadow-sm sm:text-sm border-gray-700 focus:ring-indigo-500 focus:border-indigo-500
                ${!isEditMode ? 'block' : 'hidden'}`}">
			{@html !isEditMode ? marked($data.description) : ""}
		</article>
	</div>
	<div
		class="flex items-center justify-between text-xs text-gray-500 border-gray-700 rounded-b-md">
		<div class="absolute left-0 flex bottom-[-32px] z-1">
			<button
				on:click|preventDefault="{() => {
					isEditMode = true;
				}}"
				class="{`flex items-center p-2 focus:outline-none
                ${
					isEditMode
						? 'text-gray-300 bg-gray-800 border border-t-0 border-gray-700 rounded-b-md'
						: ''
				}`}">
				<svg class="mr-1" width="15" height="15">
					<use xlink:href="#pencil"></use>
				</svg>
				Edit
			</button>
			<button
				on:click|preventDefault="{() => {
					isEditMode = false;
				}}"
				class="{`flex items-center p-2 focus:outline-none
                ${
					!isEditMode
						? 'text-gray-300 bg-gray-800 border border-t-0 border-gray-700 rounded-b-md'
						: ''
				}`}">
				<svg class="mr-1" width="15" height="15">
					<use xlink:href="#eye"></use>
				</svg>
				Preview
			</button>
		</div>
		<div class="absolute right-0 flex p-2 bottom-[-32px]">
			<div
				class="{`font-medium flex items-center ${
					$data.description?.match(/\w+/g)?.length > { maxLength }
						? 'text-red-500'
						: 'text-gray-400'
				}`}">
				{$data.description?.match(/\w+/g)?.length || 0} / {maxLength}
			</div>
			<svg class="ml-2 text-[#fc0]" width="20" height="20">
				<use xlink:href="#markdown"></use>
			</svg>
		</div>
	</div>
</div>
