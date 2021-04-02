<script>
	import { onMount } from "svelte";
	import { gql, mutation } from "@urql/svelte";

	import tippy from "sveltejs-tippy";
	import { createForm } from "felte";
	import { validator } from "@felte/validator-yup";
	import reporter from "@felte/reporter-tippy";
	import * as yup from "yup";

	import SlimSelect from "slim-select";
	import currencyToSymbolMap from "currency-symbol-map/map";
	import getSymbolFromCurrency from "currency-symbol-map";
	import { countries, flag, name } from "country-emoji";

	import { ToggleBtn } from "@components";

	import autosize from "autosize";

	const currencyCodes = Object.keys(currencyToSymbolMap);
	const countryCodes = Object.keys(countries);

	let currencySelector,
		countriesSelector,
		citiesSelector,
		tagsSelector,
		categorySelector,
		jobTypeSelector,
		flairSelector;

	let textarea;

	const categories = [
		"Software Development",
		"Game Development",
		"Quality Assurance",
		"Customer Support",
		"Sales",
		"Marketing",
		"Design",
		"Legal",
	];

	const jobTypes = [
		{ text: "Full Time", value: "FullTime" },
		{ text: "Part Time", value: "PartTime" },
		{ text: "Contract", value: "Contract" },
		{ text: "Temporary", value: "Temporary" },
		{ text: "Volunteer", value: "Volunteer" },
		{ text: "Internship", value: "Internship" },
		{ text: "Other", value: "Other" },
	];

	const flairs = [
		{ text: "$20 - Urgent", value: "Urgent" },
		{ text: "$30 - Exclusive", value: "Exclusive" },
		{ text: "$40 - Promoted", value: "Promoted" },
		{ text: "$50 - Sponsored", value: "Sponsored" },
		{ text: "$60 - Hot", value: "Hot" },
		{ text: "$80 - Popular", value: "Popular" },
		{ text: "$90 - Featured", value: "Featured" },
	];

	onMount(() => {
		new SlimSelect({
			select: currencySelector,
		});
		new SlimSelect({
			select: countriesSelector,
			limit: 5,
			closeOnSelect: false,
			placeholder: "Select Countries",
		});
		new SlimSelect({
			select: citiesSelector,
			limit: 5,
			closeOnSelect: false,
			placeholder: "Select Cities",
			addable: (value) => {
				log.info(value);
				return value;
			},
			searchingText: "Searching...",
			ajax: (search, callback) => {
				if (search.length < 3) {
					callback("Need 3 Characters");
					return;
				}
				const data = [
					{ text: "New York" },
					{ text: "New Delhi" },
					{ text: "New Hampshire" },
				];
				setTimeout(() => {
					callback(data);
				}, 1000);
			},
		});
		new SlimSelect({
			select: tagsSelector,
			limit: 5,
			placeholder: "Select Tags",
			closeOnSelect: false,
			addable: (value) => {
				log.info(value);
				return {
					text: value,
					value: value,
				};
			},
			searchingText: "Searching...",
			ajax: (search, callback) => {
				if (search.length < 3) {
					callback("Need 3 Characters");
					return;
				}
				const data = [
					{ text: "Java" },
					{ text: "JavaScript" },
					{ text: "Java Script" },
				];
				setTimeout(() => {
					callback(data);
				}, 1000);
			},
		});
		new SlimSelect({
			select: categorySelector,
			placeholder: "Select Category",
		});
		new SlimSelect({
			select: jobTypeSelector,
			placeholder: "Select Job Type",
		});
		new SlimSelect({
			select: flairSelector,
			placeholder: "Select Flair",
		});

		autosize(textarea);
	});

	const createJob = mutation({
		query: gql`
			mutation CreateJob($input: [AddJobInput!]!) {
				jobs: addJob(input: $input) {
					job {
						id
					}
				}
			}
		`,
		variables: {
			input: [
				{
					company: {
						email: "abhijit.kar@quillerbee.com",
					},
					title: "Fullstack Developer",
					description: "Do Fullstack for QuillerBee",
					url: "https://www.quillerbee.com",
					salary: {
						min: 10000,
						max: 20000,
						currency: "JPY",
					},
					location: {
						remote: true,
						countries: ["IN", "US", "JP"],
						cities: [
							{
								name: "Hyderabad",
							},
							{
								name: "Texas",
							},
							{
								name: "Tokyo",
							},
						],
					},
					tags: [
						{
							name: "JavaScript",
						},
						{
							name: "TypeScript",
						},
					],
					category: {
						name: "Software Development",
					},
					type: "Other",
					status: "Active",
					flair: "Sponsored",
					created: "2021-03-21T10:59:12.986Z",
				},
			],
		},
	});

	let validateSchema = yup.object().shape({
		title: yup.string().trim().required("Required"),
		url: yup.string().url("Must be a URL").required("Required"),
		salary: yup.object({
			min: yup.number().truncate().positive("Must be more than Zero"),
			max: yup
				.number()
				.truncate()
				.moreThan(yup.ref("min"), "Must be more than Minimum"),
			currency: yup.string(),
		}),
		description: yup
			.string()
			.wordLimit(1000, "Keep it Short")
			.required("Required"),
	});

	const { form, data, errors } = createForm({
		initialValues: {
			title: "",
			url: "",
			salary: {
				min: "",
				max: "",
				currency: "USD",
			},
			description: "",
		},
		extend: [validator, reporter],
		validateSchema,
		onSubmit: (values) => {
			log.info(validateSchema.cast(values));
			createJob();
		},
	});
</script>

<style>
	textarea {
		resize: vertical;
		max-height: 50vh;
	}
</style>

<form
	use:form
	class="relative flex flex-col px-4 py-5 mb-6 space-y-6 text-white transition-shadow duration-300 ease-in-out bg-gray-900 rounded-lg hover:shadow-lg ribbon-container">
	<span class="ribbon left"> Job Post </span>

	<div class="grid grid-flow-row grid-cols-2 grid-rows-1 gap-x-4 gap-y-6">
		<div>
			<label
				for="title"
				class="inline-flex items-center text-sm font-medium text-gray-300 cursor-pointer focus:outline-none"
				use:tippy="{{
					content: `
						<b>Title (Required)</b>
						<hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
						<ul class="text-left hex">
							<li>Keep it short & simple.</li>
							<li>Create multiple job posts for multiple roles.</li>
							<li>A job post is limited to a single job.</li>
							<li>Must be a real job.</li>
							<li><b>DO NOT WRITE IN FULL CAPS</b>.</li>
						</ul>`,
					theme: 'warn',
					allowHTML: true,
				}}">
				Title
				<svg width="15" height="15" class="text-[#fc0] ml-1 -mt-0.5">
					<use xlink:href="#information-circle"></use>
				</svg>
			</label>
			<input
				id="title"
				type="text"
				name="title"
				autocomplete="title"
				placeholder="Job Title"
				class="{`block w-full mt-1 bg-gray-800 rounded-md shadow-sm sm:text-sm
			${
				$errors.title
					? 'border-red-500 ring-1 ring-red-500 focus:ring-red-500 focus:border-red-500'
					: 'border-gray-700 focus:ring-indigo-500 focus:border-indigo-500'
			}`}" />
		</div>

		<div>
			<label
				for="url"
				class="inline-flex items-center text-sm font-medium text-gray-300 cursor-pointer focus:outline-none"
				use:tippy="{{
					content: `
						<b>Link (Required)</b>
						<hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
						<ul class="text-left hex">
							<li>A link to your job application site.</li>
							<li>If you don't have one, make it with <a class="inline font-bold" target="_blank" rel="noopener" href="https://www.lever.co/">Lever.co</a>.</li>
						</ul>`,
					theme: 'warn',
					allowHTML: true,
					interactive: true,
				}}">
				Link
				<svg width="15" height="15" class="text-[#fc0] ml-1 -mt-0.5">
					<use xlink:href="#information-circle"></use>
				</svg>
			</label>
			<input
				id="url"
				type="text"
				inputmode="url"
				name="url"
				autocomplete="url"
				class="{`block w-full mt-1 bg-gray-800 rounded-md shadow-sm sm:text-sm
					${
						$errors.url
							? 'border-red-500 ring-1 ring-red-500 focus:ring-red-500 focus:border-red-500'
							: 'border-gray-700 focus:ring-indigo-500 focus:border-indigo-500'
					}`}"
				placeholder="https://example.com/job-post" />
		</div>
	</div>
	<div></div>
	<fieldset
		name="salary"
		class="relative flex flex-col p-3 pt-6 border border-gray-700 rounded-lg">
		<div
			for="currency"
			class="absolute inline-flex items-center pl-4 pr-3 text-sm bg-gray-800 border border-gray-700 cursor-pointer focus:outline-none -top-3 left-5 rounded-xl"
			use:tippy="{{
				content: `
					<b>Salary (Required)</b>
					<hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
					<ul class="text-left hex">
						<li>Google doesn't index jobs without salary.</li>
						<li>Must be in yearly format.</li>
					</ul>`,
				theme: 'warn',
				allowHTML: true,
			}}">
			Salary
			<svg width="15" height="15" class="text-[#fc0] ml-1.5 -mt-0.5">
				<use xlink:href="#information-circle"></use>
			</svg>
		</div>
		<div class="grid grid-flow-col gap-2">
			<select
				id="currency"
				name="currency"
				bind:this="{currencySelector}"
				bind:value="{$data.salary.currency}"
				class="text-sm text-gray-300 bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
				{#each currencyCodes as currencyCode}
					<option class="bg-gray-800" value="{currencyCode}">
						{currencyCode}
					</option>
				{/each}
			</select>
			<div class="flex rounded-md shadow-sm">
				<div
					class="flex items-center px-3 bg-gray-700 border border-r-0 border-gray-700 pointer-events-none rounded-l-md">
					<span class="text-gray-500 sm:text-sm">
						{getSymbolFromCurrency($data.salary.currency)}
					</span>
				</div>
				<input
					type="text"
					inputmode="numeric"
					name="min"
					bind:value="{$data.salary.min}"
					class="{`block w-full bg-gray-800 border-l-0 rounded-r-md shadow-sm sm:text-sm
						${
							$errors.salary.min
								? 'border-red-500 ring-1 ring-red-500 focus:ring-red-500 focus:border-red-500'
								: 'border-gray-700 focus:ring-indigo-500 focus:border-indigo-500'
						}`}"
					placeholder="0.00" />
			</div>
			<div class="flex rounded-md shadow-sm">
				<div
					class="flex items-center px-3 bg-gray-700 border border-r-0 border-gray-700 pointer-events-none rounded-l-md">
					<span class="text-gray-500 sm:text-sm"
						>{getSymbolFromCurrency($data.salary.currency)}</span>
				</div>
				<input
					type="text"
					inputmode="numeric"
					name="max"
					bind:value="{$data.salary.max}"
					class="{`block w-full bg-gray-800 border-l-0 rounded-r-md shadow-sm sm:text-sm
						${
							$errors.salary.max
								? 'border-red-500 ring-1 ring-red-500 focus:ring-red-500 focus:border-red-500'
								: 'border-gray-700 focus:ring-indigo-500 focus:border-indigo-500'
						}`}"
					placeholder="0.00" />
			</div>
		</div>
	</fieldset>
	<div></div>
	<fieldset
		name="location"
		class="relative flex flex-col p-3 pt-0 space-y-6 border border-gray-700 rounded-lg">
		<div
			for="currency"
			class="absolute inline-flex items-center pl-4 pr-3 text-sm bg-gray-800 border border-gray-700 cursor-pointer focus:outline-none -top-3 left-5 rounded-xl"
			use:tippy="{{
				content: `
					<b>Location (Required)</b>
					<hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
					<ul class="text-left hex">
						<li>Jobs will be presented to candidates based on location.</li>
						<li>Worldwide positions will get widest exposure.</li>
					</ul>`,
				theme: 'warn',
				allowHTML: true,
			}}">
			Location
			<svg width="15" height="15" class="text-[#fc0] ml-1.5 -mt-0.5">
				<use xlink:href="#information-circle"></use>
			</svg>
		</div>
		<div class="grid grid-flow-row gap-2">
			<div class="flex items-center justify-between p-2 pr-0">
				<label
					for="remote"
					class="block mb-1 text-sm font-medium text-gray-300">
					Is this a Remote Position?
				</label>
				<ToggleBtn id="remote" />
			</div>
			<div class="flex items-center justify-between p-2 pr-0">
				<label
					for="worldwide"
					class="block mb-1 text-sm font-medium text-gray-300">
					Is this Worldwide?
				</label>
				<ToggleBtn id="worldwide" />
			</div>
		</div>

		<div class="grid grid-flow-row grid-cols-1 grid-rows-2 gap-6">
			<div>
				<label
					for="countries"
					class="block mb-1 text-sm font-medium text-gray-300 grid-col-2">
					Countries
				</label>
				<div class="grid grid-flow-row gap-2">
					<select
						id="countries"
						name="countries"
						bind:this="{countriesSelector}"
						multiple
						class="mt-1 text-sm text-gray-300 bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
						{#each countryCodes as countryCode}
							<option class="bg-gray-800" value="{countryCode}"
								>{flag(countryCode)}
								{name(countryCode)}</option>
						{/each}
						<option class="bg-gray-800">United States</option>
					</select>
				</div>
			</div>
			<div>
				<label
					for="cities"
					class="block mb-1 text-sm font-medium text-gray-300 grid-col-2">
					Cities
				</label>
				<div class="grid grid-flow-row gap-2">
					<select
						id="cities"
						name="cities"
						bind:this="{citiesSelector}"
						multiple
						class="mt-1 text-sm text-gray-300 bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
					</select>
				</div>
			</div>
		</div>

		<div></div>

		<fieldset
			name="timezone"
			class="relative flex flex-col p-3 pt-6 border border-gray-700 rounded-lg">
			<div
				for="currency"
				class="absolute inline-flex items-center pl-4 pr-3 text-sm bg-gray-800 border border-gray-700 cursor-pointer focus:outline-none -top-3 left-5 rounded-xl"
				use:tippy="{{
					content: `
					<b>Time Zone (Required)</b>
					<hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
					<ul class="text-left hex">
						<li>Must be in UTC format.</li>
						<li>Jobs will be served based on candidate's Time Zone.</li>
					</ul>`,
					theme: 'warn',
					allowHTML: true,
				}}">
				Time Zone
				<svg width="15" height="15" class="text-[#fc0] ml-1.5 -mt-0.5">
					<use xlink:href="#information-circle"></use>
				</svg>
			</div>
			<div class="grid grid-flow-col gap-2">
				<div class="flex rounded-md shadow-sm">
					<div
						class="flex items-center px-3 bg-gray-700 border border-r-0 border-gray-700 pointer-events-none rounded-l-md">
						<span class="text-gray-500 sm:text-sm"> UTC </span>
					</div>
					<input
						id="time-zone"
						type="text"
						name="price"
						class="block w-full pr-12 bg-gray-800 border-gray-700 rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						placeholder="-5" />
				</div>
				<div class="flex rounded-md shadow-sm">
					<div
						class="flex items-center px-3 pl-3 bg-gray-700 border border-r-0 border-gray-700 pointer-events-none rounded-l-md">
						<span class="text-gray-500 sm:text-sm"> UTC </span>
					</div>
					<input
						type="text"
						name="price"
						class="block w-full pr-12 bg-gray-800 border-gray-700 rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						placeholder="+5" />
				</div>
			</div>
		</fieldset>
	</fieldset>

	<div class="grid grid-flow-row grid-cols-3 grid-rows-2 gap-x-4 gap-y-6">
		<div class="col-span-3">
			<label
				for="tags"
				class="inline-flex items-center text-sm font-medium text-gray-300 cursor-pointer focus:outline-none"
				use:tippy="{{
					content: `
						<b>Tags (Required)</b>
						<hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
						<ul class="text-left hex">
							<li>Tag the job with your Tech Stack.</li>
							<li>Upto 5 tags are allowed.</li>
							<li>Search and use existing Tags.</li>
							<li>Carefully create new Tag.</li>
							<li>Jobs can be searched with Tags.</li>
						</ul>`,
					theme: 'warn',
					allowHTML: true,
				}}">
				Tags
				<svg width="15" height="15" class="text-[#fc0] ml-1 -mt-0.5">
					<use xlink:href="#information-circle"></use>
				</svg>
			</label>
			<div class="grid grid-flow-row gap-2">
				<select
					id="tags"
					name="tags"
					bind:this="{tagsSelector}"
					multiple
					class="mt-1 text-sm text-gray-300 bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
				</select>
			</div>
		</div>

		<div>
			<label
				for="category"
				class="inline-flex items-center text-sm font-medium text-gray-300 cursor-pointer focus:outline-none"
				use:tippy="{{
					content: `
						<b>Category (Required)</b>
						<hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
						<ul class="text-left hex">
							<li>Broad Category, the Job belongs to.</li>
							<li>Reach out to us, if we don't conver a Category.</li>
							<li>Job will show up in the selected Category.</li>
						</ul>`,
					theme: 'warn',
					allowHTML: true,
				}}">
				Category
				<svg width="15" height="15" class="text-[#fc0] ml-1 -mt-0.5">
					<use xlink:href="#information-circle"></use>
				</svg>
			</label>
			<div class="grid grid-flow-row gap-2">
				<select
					id="category"
					name="category"
					bind:this="{categorySelector}"
					class="mt-1 text-sm text-gray-300 bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
					<option data-placeholder="true"></option>
					{#each categories as category}
						<option>{category}</option>
					{/each}
				</select>
			</div>
		</div>

		<div>
			<label
				for="job-type"
				class="inline-flex items-center text-sm font-medium text-gray-300 cursor-pointer focus:outline-none"
				use:tippy="{{
					content: `
						<b>Job Type (Required)</b>
						<hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
						<ul class="text-left hex">
							<li>Depicts the Duration & Severity of the Job.</li>
							<li>It will be color coded.</li>
						</ul>`,
					theme: 'warn',
					allowHTML: true,
				}}">
				Job Type
				<svg width="15" height="15" class="text-[#fc0] ml-1 -mt-0.5">
					<use xlink:href="#information-circle"></use>
				</svg>
			</label>
			<div class="grid grid-flow-row gap-2">
				<select
					id="job-type"
					name="type"
					bind:this="{jobTypeSelector}"
					class="mt-1 text-sm text-gray-300 bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
					<option data-placeholder="true"></option>
					{#each jobTypes as jobType}
						<option value="{jobType.value}">{jobType.text}</option>
					{/each}
				</select>
			</div>
		</div>

		<div>
			<label
				for="flair"
				class="inline-flex items-center text-sm font-medium text-gray-300 cursor-pointer focus:outline-none"
				use:tippy="{{
					content: `
						<b>Flair</b>
						<hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
						<ul class="text-left hex">
							<li>Add flair to stand out of the other job posts.</li>
							<li>Costs money to add a flair.</li>
						</ul>`,
					theme: 'warn',
					allowHTML: true,
				}}">
				Flair
				<svg width="15" height="15" class="text-[#fc0] ml-1 -mt-0.5">
					<use xlink:href="#annotation"></use>
				</svg>
			</label>
			<div class="grid grid-flow-row gap-2">
				<select
					id="flair"
					name="flair"
					bind:this="{flairSelector}"
					class="mt-1 text-sm text-gray-300 bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
					<option data-placeholder="true"></option>
					{#each flairs as flair}
						<option value="{flair.value}">{flair.text}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>
	<div>
		<label
			for="description"
			class="inline-flex items-center text-sm font-medium text-gray-300 cursor-pointer focus:outline-none"
			use:tippy="{{
				content: `
						<b>Description (Required)</b>
						<hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
						<ul class="text-left hex">
							<li>Describe the responsibilities of the Job.</li>
							<li>Keep it to 1000 letters.</li>
							<li>Use Markdown. See <a class="inline font-bold" target="_blank" rel="noopener" href="https://simplemde.com/markdown-guide">Basic</a> & <a class="inline font-bold" target="_blank" rel="noopener" href="https://www.markdownguide.org/basic-syntax/">Comprehensive</a> guide.</li>
						</ul>`,
				theme: 'warn',
				allowHTML: true,
				interactive: true,
			}}">
			Description
			<svg width="15" height="15" class="text-[#fc0] ml-1 -mt-0.5">
				<use xlink:href="#information-circle"></use>
			</svg>
		</label>
		<textarea
			id="description"
			name="description"
			rows="8"
			bind:this="{textarea}"
			bind:value="{$data.description}"
			class="{`block w-full mt-1 bg-gray-800 rounded-bl-none rounded-md shadow-sm sm:text-sm
				${
					$errors.description
						? 'border-red-500 ring-1 ring-red-500 focus:ring-red-500 focus:border-red-500'
						: 'border-gray-700 focus:ring-indigo-500 focus:border-indigo-500'
				}`}"
			placeholder="Describe the Job Eloquently."></textarea>
		<div class="flex items-center justify-between text-xs border-gray-700 rounded-b-md">
			<div class="flex">
				<button on:click|preventDefault class="p-2 mt-[-3px] bg-gray-800 border border-t-0 border-gray-700 rounded-b-md focus:outline-none">Edit</button>
				<button on:click|preventDefault class="p-2 focus:outline-none">Preview</button>
			</div>
			<div class="flex p-2">
				<div
					class="{`font-medium flex items-center ${
						$data.description?.match(/\w+/g)?.length > 1000
							? 'text-red-500'
							: 'text-gray-400'
					}`}">
					{$data.description?.match(/\w+/g)?.length || 0} / 1000
				</div>
				<svg class="ml-2 text-[#fc0]" width="20" height="20">
					<use xlink:href="#markdown"></use>
				</svg>
			</div>
		</div>
	</div>

	<div class="py-3 text-right">
		<button
			class="inline-flex justify-center px-4 py-2 mr-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
			Cancel
		</button>
		<button
			type="submit"
			class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
			Post
		</button>
	</div>
</form>
