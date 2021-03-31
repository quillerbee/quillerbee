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

	let validateSchema = yup.object().shape({
		title: yup.string().trim().required("Title Required!"),
		url: yup
			.string()
			.url("URL must be Proper!")
			.required("Job URL is Required!"),
		salary: yup.object({
			min: yup
				.number()
				.positive("Salary must be greater than 0!")
				.integer("Salary must be an Integer!"),
			max: yup
				.number()
				.positive("Salary must be greater than 0!")
				.integer("Salary must be an Integer!")
				.moreThan(
					yup.ref("min"),
					"Max Salary must be larger than Minimum!"
				),
			currency: yup.string().required(),
		}),
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
		},
		extend: [validator, reporter],
		validateSchema,
		onSubmit: (values) => {
			log.info(validateSchema.cast(values));
			createJob();
		},
	});
</script>

<form
	use:form
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
				tabindex="0"
				use:tippy="{{
					content: `
						<b>Link (Required)</b>
						<hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
						<ul class="text-left hex">
							<li>A link to your job application site.</li>
							<li>If you don't have one, create one with Lever.co.</li>
						</ul>`,
					theme: 'warn',
					allowHTML: true,
				}}">
				Link
				<svg width="15" height="15" class="text-[#fc0] ml-1 -mt-0.5">
					<use xlink:href="#information-circle"></use>
				</svg>
			</label>
			<input
				id="url"
				type="text"
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
			tabindex="0"
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
					id="min-salary"
					type="number"
					name="min"
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
					id="max-salary"
					type="number"
					name="max"
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
			tabindex="0"
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
				tabindex="0"
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
				for="hashtags"
				class="inline-flex items-center text-sm font-medium text-gray-300 cursor-pointer focus:outline-none"
				tabindex="0"
				use:tippy="{{
					content: `
						<b>Hash Tags (Required)</b>
						<hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
						<ul class="text-left hex">
							<li>Tag the job with your Tech Stack.</li>
							<li>Search and use existing Hash Tags.</li>
							<li>Carefully create new Hash Tag.</li>
							<li>Jobs can be searched with Hash Tags.</li>
						</ul>`,
					theme: 'warn',
					allowHTML: true,
				}}">
				Hash Tags
				<svg width="15" height="15" class="text-[#fc0] ml-1 -mt-0.5">
					<use xlink:href="#information-circle"></use>
				</svg>
			</label>
			<div class="grid grid-flow-row gap-2">
				<select
					id="hashtags"
					name="hashtags"
					bind:this="{hashtagsSelector}"
					multiple
					class="mt-1 text-sm text-gray-300 bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
				</select>
			</div>
		</div>

		<div>
			<label
				for="category"
				class="inline-flex items-center text-sm font-medium text-gray-300 cursor-pointer focus:outline-none"
				tabindex="0"
				use:tippy="{{
					content: `
						<b>Category (Required)</b>
						<hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
						<ul class="text-left hex">
							<li>Category.</li>
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
				tabindex="0"
				use:tippy="{{
					content: `
						<b>Job Type (Required)</b>
						<hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
						<ul class="text-left hex">
							<li>Job Type.</li>
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
				tabindex="0"
				use:tippy="{{
					content: `
						<b>Flair</b>
						<hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
						<ul class="text-left hex">
							<li>Hash Tags.</li>
						</ul>`,
					theme: 'warn',
					allowHTML: true,
				}}">
				Flair
				<svg width="15" height="15" class="text-[#fc0] ml-1 -mt-0.5">
					<use xlink:href="#information-circle"></use>
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
						<option>{flair}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>
	<div>
		<label
				for="description"
				class="inline-flex items-center text-sm font-medium text-gray-300 cursor-pointer focus:outline-none"
				tabindex="0"
				use:tippy="{{
					content: `
						<b>Description (Required)</b>
						<hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
						<ul class="text-left hex">
							<li>Hash Tags.</li>
						</ul>`,
					theme: 'warn',
					allowHTML: true,
				}}">
				Description
				<svg width="15" height="15" class="text-[#fc0] ml-1 -mt-0.5">
					<use xlink:href="#information-circle"></use>
				</svg>
			</label>
		<textarea
			id="description"
			name="description"
			rows="3"
			class="block w-full mt-1 bg-gray-800 border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			placeholder="Describe the Job Eloquently."></textarea>
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
