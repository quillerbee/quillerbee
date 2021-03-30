<script>
	import { onMount } from "svelte";
	import { gql, mutation } from "@urql/svelte";
	import { createForm } from "svelte-forms-lib";
	import * as yup from "yup";
	import SlimSelect from "slim-select";
	import currencyToSymbolMap from "currency-symbol-map/map";
	import getSymbolFromCurrency from "currency-symbol-map";
	import { countries, flag, name } from "country-emoji";

	const currencyCodes = Object.keys(currencyToSymbolMap);
	const countryCodes = Object.keys(countries);

	let currencySelector, countriesSelector, hashtagsSelector;

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
			select: hashtagsSelector,
			limit: 5,
			closeOnSelect: false,
			addable: (value) => {
				log.info(value);
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

	<div class="col-span-6 sm:col-span-3">
		<label for="name" class="block text-sm font-medium text-gray-300"
			>Title</label>
		<input
			id="title"
			type="text"
			name="title"
			autocomplete="title"
			on:change="{handleChange}"
			on:blur="{handleChange}"
			bind:value="{$form.title}"
			class="{`block w-full mt-1 bg-gray-800 rounded-md shadow-sm sm:text-sm
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
			<p class="mt-2 text-xs text-gray-400">
				Please specify as single job position like "Marketing Manager"
				or "Node JS Developer", not a sentence like "Looking for PM /
				Biz Dev / Manager". We know your job is important but please DO
				NOT WRITE IN FULL CAPS. If posting multiple roles, please create
				multiple job posts. A job post is limited to a single job. We
				only allow real jobs.
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
				placeholder="www.example.com" />
		</div>
		{#if $errors.url}
			<p class="mt-2 text-xs text-red-500">
				{$errors.url}
			</p>
		{:else}
			<p class="mt-2 text-xs text-gray-400">
				Apply URLs with a form an applicant can fill out generally
				receive a lot more applicants than having people apply by email
				(below). A good platform to have applicants apply on is Lever.co
				(not affiliated).
			</p>
		{/if}
	</div>

	<div>
		<label for="price" class="block mb-1 text-sm font-medium text-gray-300"
			>Salary Range</label>
		<div class="grid grid-flow-col gap-2">
			<select
				id="salary.currency"
				name="salary.currency"
				on:change="{handleChange}"
				on:blur="{handleChange}"
				bind:this="{currencySelector}"
				bind:value="{$form.salary.currency}"
				class="text-sm text-gray-300 bg-transparent bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
				{#each currencyCodes as currencyCode}
					<option class="bg-gray-900" value="{currencyCode}">
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
					id="salary.min"
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
					id="salary.max"
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
			<p class="mt-2 text-xs text-gray-400">
				Required because Google does not index jobs without salary data
				since 2021! If it's a short-term gig, use the annual equivalent.
				For example, if it's a 2-week project for $2,000, the annual
				equivalent would be $2,000 / 2 weeks * 52 weeks = $48,000.
			</p>
		{/if}
	</div>

	<div class="relative flex flex-col p-3 space-y-6 border border-gray-700 rounded-lg">
		<div class="absolute px-4 text-sm bg-gray-900 border border-gray-700 -top-3 left-5 rounded-xl">
			Location
		</div>
		<div>
			<label
				for="price"
				class="block mb-1 text-sm font-medium text-gray-300 grid-col-2">
				Time Zone
			</label>
			<div class="grid grid-flow-col gap-2">
				<div class="flex rounded-md shadow-sm">
					<div
						class="flex items-center px-3 bg-gray-700 border border-r-0 border-gray-700 pointer-events-none rounded-l-md">
						<span class="text-gray-500 sm:text-sm"> UTC </span>
					</div>
					<input
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
	
		<div>
			<label
				for="countries"
				class="block mb-1 text-sm font-medium text-gray-300 grid-col-2">
				Countries
			</label>
			<div class="grid grid-flow-col gap-2">
				<select
					id="countries"
					name="countries"
					bind:this="{countriesSelector}"
					multiple
					class="text-sm text-gray-300 bg-transparent bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
					{#each countryCodes as countryCode}
						<option class="bg-gray-900" value="{countryCode}"
							>{flag(countryCode)} {name(countryCode)}</option>
					{/each}
					<option class="bg-gray-900">United States</option>
				</select>
			</div>
		</div>
	</div>

	<div>
		<label
			for="price"
			class="block mb-1 text-sm font-medium text-gray-300 grid-col-2">
			Hash Tags
		</label>
		<div class="grid grid-flow-col gap-2">
			<select
				name="hashtags"
				bind:this="{hashtagsSelector}"
				multiple
				class="text-sm text-gray-300 bg-transparent bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
			</select>
		</div>
	</div>

	<div>
		<label
			for="price"
			class="block mb-1 text-sm font-medium text-gray-300 grid-col-2"
			>Category</label>
		<div class="grid grid-flow-col gap-2">
			<select
				name="category"
				class="text-sm text-gray-300 bg-transparent bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
				<option class="bg-gray-900">Software Engineer</option>
				<option class="bg-gray-900">Game Developer</option>
			</select>
		</div>
	</div>

	<div>
		<label
			for="price"
			class="block mb-1 text-sm font-medium text-gray-300 grid-col-2"
			>Job Type</label>
		<div class="grid grid-flow-col gap-2">
			<select
				name="type"
				class="text-sm text-gray-300 bg-transparent bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
				<option class="bg-gray-900">Full Time</option>
				<option class="bg-gray-900">Part Time</option>
			</select>
		</div>
	</div>

	<div>
		<label
			for="price"
			class="block mb-1 text-sm font-medium text-gray-300 grid-col-2"
			>Flair</label>
		<div class="grid grid-flow-col gap-2">
			<select
				name="remote"
				class="text-sm text-gray-300 bg-transparent bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
				<option class="bg-gray-900">Hot</option>
				<option class="bg-gray-900">Urgent</option>
			</select>
		</div>
	</div>

	<div>
		<label for="about" class="block text-sm font-medium text-gray-300">
			Description
		</label>
		<textarea
			name="about"
			rows="3"
			class="block w-full mt-1 bg-gray-800 border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			placeholder="you@example.com"></textarea>
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
