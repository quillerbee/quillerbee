<script>
	import { onMount } from "svelte";
	import { gql, mutation } from "@urql/svelte";
	import { createForm } from "svelte-forms-lib";
	import * as yup from "yup";
	import SlimSelect from "slim-select";
	import currencyToSymbolMap from "currency-symbol-map/map";
	import getSymbolFromCurrency from "currency-symbol-map";
	import { countries, flag, name } from "country-emoji";
	import { ToggleBtn } from "@components";
	import tippy from "sveltejs-tippy";

	const currencyCodes = Object.keys(currencyToSymbolMap);
	const countryCodes = Object.keys(countries);

	let currencySelector,
		countriesSelector,
		citiesSelector,
		hashtagsSelector,
		categorySelector,
		jobTypeSelector,
		flairSelector;

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
		"Hot",
		"Urgent",
		"Popular",
		"Promoted",
		"Exclusive",
		"Sponsored",
		"Featured",
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
			select: hashtagsSelector,
			limit: 5,
			placeholder: "Select Hash Tags",
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
					hashtags: [
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

	let validationSchema = yup.object().shape({
		title: yup.string().trim().required("Job Title is Required!"),
		url: yup
			.string()
			.url("URL must be Proper!")
			.required("Job URL is Required!"),
		salary: yup.object({
			min: yup.number().required().positive().integer().min(1),
			max: yup
				.number()
				.required()
				.positive()
				.integer()
				.moreThan(yup.ref("min")),
			currency: yup.string().required(),
		}),
	});

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			title: "",
			url: "",
			salary: {
				min: "",
				max: "",
				currency: "USD",
			},
		},
		validationSchema,
		onSubmit: (values) => {
			log.info(validationSchema.cast(values));
			createJob();
		},
	});
</script>

<form
	on:submit|preventDefault="{handleSubmit}"
	class="relative flex flex-col px-4 py-5 mb-6 space-y-6 text-white transition-shadow duration-300 ease-in-out bg-gray-900 rounded-lg hover:shadow-lg ribbon-container">
	<span class="ribbon left"> Job Post </span>

	<div class="grid grid-flow-row grid-cols-2 grid-rows-1 gap-x-4 gap-y-6">
		<div>
			<label
				for="title"
				class="inline-flex items-center text-sm font-medium text-gray-300 cursor-pointer focus:outline-none"
				tabindex="0"
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
				on:change="{handleChange}"
				on:blur="{handleChange}"
				bind:value="{$form.title}"
				class="{`block w-full bg-gray-800 rounded-md shadow-sm sm:text-sm
			${
				$errors.title
					? 'border-red-500 ring-1 ring-red-500 focus:ring-red-500 focus:border-red-500'
					: 'border-gray-700 focus:ring-indigo-500 focus:border-indigo-500'
			}`}" />
			{#if $errors.title}
				<p class="mt-2 text-xs text-red-500">
					{$errors.title}
				</p>
			{:else}
				<p class="hidden mt-2 text-xs text-gray-400">
					Please specify as single job position like "Marketing
					Manager" or "Node JS Developer", not a sentence like
					"Looking for PM / Biz Dev / Manager". We know your job is
					important but please DO NOT WRITE IN FULL CAPS. If posting
					multiple roles, please create multiple job posts. A job post
					is limited to a single job. We only allow real jobs.
				</p>
			{/if}
		</div>

		<div>
			<label for="url" class="block text-sm font-medium text-gray-300">
				Link
			</label>
			<div class="flex mt-1 rounded-md shadow-sm">
				<input
					id="url"
					type="text"
					name="url"
					autocomplete="url"
					on:change="{handleChange}"
					on:blur="{handleChange}"
					bind:value="{$form.url}"
					class="{`block w-full bg-gray-800 rounded-md shadow-sm sm:text-sm
					${
						$errors.url
							? 'border-red-500 ring-1 ring-red-500 focus:ring-red-500 focus:border-red-500'
							: 'border-gray-700 focus:ring-indigo-500 focus:border-indigo-500'
					}`}"
					placeholder="https://example.com/job-post" />
			</div>
			{#if $errors.url}
				<p class="mt-2 text-xs text-red-500">
					{$errors.url}
				</p>
			{:else}
				<p class="hidden mt-2 text-xs text-gray-400">
					Apply URLs with a form an applicant can fill out generally
					receive a lot more applicants than having people apply by
					email (below). A good platform to have applicants apply on
					is Lever.co (not affiliated).
				</p>
			{/if}
		</div>
	</div>
	<div></div>
	<div
		class="relative flex flex-col p-3 pt-6 border border-gray-700 rounded-lg">
		<div
			for="currency"
			class="absolute px-4 text-sm bg-gray-800 border border-gray-700 -top-3 left-5 rounded-xl">
			Salary
		</div>
		<div class="grid grid-flow-col gap-2">
			<select
				id="currency"
				name="salary.currency"
				on:change="{handleChange}"
				on:blur="{handleChange}"
				bind:this="{currencySelector}"
				bind:value="{$form.salary.currency}"
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
						{getSymbolFromCurrency($form.salary.currency)}
					</span>
				</div>
				<input
					id="min-salary"
					type="number"
					name="salary.min"
					on:change="{handleChange}"
					on:blur="{handleChange}"
					bind:value="{$form.salary.min}"
					class="block w-full pr-12 bg-gray-800 border-l-0 border-gray-700 rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					placeholder="0.00" />
			</div>
			<div class="flex rounded-md shadow-sm">
				<div
					class="flex items-center px-3 bg-gray-700 border border-r-0 border-gray-700 pointer-events-none rounded-l-md">
					<span class="text-gray-500 sm:text-sm"
						>{getSymbolFromCurrency($form.salary.currency)}</span>
				</div>
				<input
					id="max-salary"
					type="number"
					name="salary.max"
					on:change="{handleChange}"
					on:blur="{handleChange}"
					bind:value="{$form.salary.max}"
					class="block w-full pr-12 bg-gray-800 border-gray-700 rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					placeholder="0.00" />
			</div>
		</div>
		{#if $errors.salary.currency || $errors.salary.min || $errors.salary.max}
			<p class="mt-2 text-xs text-red-500">
				{$errors.salary.currency ||
					$errors.salary.min ||
					$errors.salary.max}
			</p>
		{:else}
			<p class="hidden mt-2 text-xs text-gray-400">
				Required because Google does not index jobs without salary data
				since 2021! If it's a short-term gig, use the annual equivalent.
				For example, if it's a 2-week project for $2,000, the annual
				equivalent would be $2,000 / 2 weeks * 52 weeks = $48,000.
			</p>
		{/if}
	</div>
	<div></div>
	<div
		class="relative flex flex-col p-3 pt-0 space-y-6 border border-gray-700 rounded-lg">
		<div
			class="absolute px-4 text-sm bg-gray-800 border border-gray-700 -top-3 left-5 rounded-xl">
			Location
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
						class="text-sm text-gray-300 bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
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
						class="text-sm text-gray-300 bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
					</select>
				</div>
			</div>
		</div>

		<div></div>

		<div
			class="relative flex flex-col p-3 pt-6 border border-gray-700 rounded-lg">
			<label
				for="time-zone"
				class="absolute px-4 text-sm bg-gray-800 border border-gray-700 -top-3 left-5 rounded-xl">
				Time Zone
			</label>
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
		</div>
	</div>

	<div class="grid grid-flow-row grid-cols-3 grid-rows-2 gap-x-4 gap-y-6">
		<div class="col-span-3">
			<label
				for="hashtags"
				class="block mb-1 text-sm font-medium text-gray-300 grid-col-2">
				Hash Tags
			</label>
			<div class="grid grid-flow-row gap-2">
				<select
					id="hashtags"
					name="hashtags"
					bind:this="{hashtagsSelector}"
					multiple
					class="text-sm text-gray-300 bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
				</select>
			</div>
		</div>

		<div>
			<label
				for="category"
				class="block mb-1 text-sm font-medium text-gray-300 grid-col-2">
				Category
			</label>
			<div class="grid grid-flow-row gap-2">
				<select
					id="category"
					name="category"
					bind:this="{categorySelector}"
					class="text-sm text-gray-300 bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
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
				class="block mb-1 text-sm font-medium text-gray-300 grid-col-2">
				Job Type
			</label>
			<div class="grid grid-flow-row gap-2">
				<select
					id="job-type"
					name="type"
					bind:this="{jobTypeSelector}"
					class="text-sm text-gray-300 bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
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
				class="block mb-1 text-sm font-medium text-gray-300 grid-col-2">
				Flair
			</label>
			<div class="grid grid-flow-row gap-2">
				<select
					id="flair"
					name="flair"
					bind:this="{flairSelector}"
					class="text-sm text-gray-300 bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
					<option data-placeholder="true"></option>
					{#each flairs as flair}
						<option>{flair}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>
	<div>
		<label
			for="description"
			class="block text-sm font-medium text-gray-300">
			Description
		</label>
		<textarea
			id="description"
			name="description"
			rows="3"
			class="block w-full mt-1 bg-gray-800 border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			placeholder="Describe the Job Eloquently."></textarea>
		<p class="mt-2 text-xs text-gray-400">
			Brief description of the job. You can use markdown to add pizzaz to
			the description.
		</p>
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
