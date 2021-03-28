<script>
	import { gql, mutation } from "@urql/svelte";

	const createJob = mutation({
		query: gql`
			mutation CreateJob($input: [AddJobInput!]!) {
				jobs: addJob(input: $input) {
					job {
						id
						company {
							name
						}
						title
						description
						locations
						salary {
							min
							max
						}
						timezone {
							min
							max
						}
						remote
						hashtags {
							name
						}
						category {
							name
						}
						type
						status
						flair
						created
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
					title: "Backend Developer",
					description: "Create Backend for QuillerBee",
					url: "https://www.quillerbee.com",
					salary: {
						min: 10000,
						max: 20000,
						currency: "JPY",
					},
					locations: ["India", "Australia"],
					timezone: {
						min: -1,
						max: 2,
					},
					remote: false,
					hashtags: [
						{
							name: "Svelte",
						},
						{
							name: "JavaScript",
						},
					],
					category: {
						name: "Software Development",
					},
					type: "FullTime",
					flair: "Urgent",
					status: "Active",
					created: "2021-03-21T10:59:12.986Z",
				},
			],
		},
	});

	const onSubmit = () => {
		createJob();
	};
</script>

<form
	on:submit|preventDefault="{onSubmit}"
	class="relative flex flex-col px-4 py-5 mb-6 space-y-6 text-white transition-shadow duration-300 ease-in-out bg-gray-900 rounded-lg hover:shadow-lg ribbon-container">
	<span class="ribbon left"> Job Post </span>

	<div class="col-span-6 sm:col-span-3">
		<label for="first_name" class="block text-sm font-medium text-gray-300"
			>Title</label>
		<input
			type="text"
			name="first_name"
			autocomplete="given-name"
			class="block w-full mt-1 bg-gray-800 border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
		<p class="mt-2 text-xs text-gray-400">
			Job Title. i.e. Software Engineer, Backend Developer, ...
		</p>
	</div>

	<div>
		<label
			for="company_website"
			class="block text-sm font-medium text-gray-300">
			Link
		</label>
		<div class="flex mt-1 rounded-md shadow-sm">
			<span
				class="inline-flex items-center px-3 text-sm text-gray-300 bg-gray-700 border border-r-0 border-gray-700 rounded-l-md">
				https://
			</span>
			<input
				type="text"
				name="company_website"
				class="flex-1 block w-full bg-gray-800 border-gray-700 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm"
				placeholder="www.example.com" />
		</div>
		<p class="mt-2 text-xs text-gray-400">
			Link to the job post in your website.
		</p>
	</div>

	<div>
		<label for="price" class="block mb-1 text-sm font-medium text-gray-300"
			>Salary Range</label>
		<div class="grid grid-flow-col gap-2">
			<select
				id="salary"
				name="salary"
				class="text-sm text-gray-300 bg-transparent bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
				<option class="bg-gray-900">USD</option>
				<option class="bg-gray-900">CAD</option>
				<option class="bg-gray-900">EUR</option>
			</select>
			<div class="relative rounded-md shadow-sm">
				<div
					class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<span class="text-gray-500 sm:text-sm"> $ </span>
				</div>
				<input
					type="text"
					name="price"
					class="block w-full pr-12 bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 pl-7 sm:text-sm"
					placeholder="0.00" />
			</div>
			<div class="relative rounded-md shadow-sm">
				<div
					class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<span class="text-gray-500 sm:text-sm"> $ </span>
				</div>
				<input
					type="text"
					name="price"
					class="block w-full pr-12 bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 pl-7 sm:text-sm"
					placeholder="0.00" />
			</div>
		</div>
	</div>

	<div>
		<label
			for="price"
			class="block mb-1 text-sm font-medium text-gray-300 grid-col-2"
			>Remote</label>
		<div class="grid grid-flow-col gap-2">
			<select
				name="remote"
				class="text-sm text-gray-300 bg-transparent bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
				<option class="bg-gray-900">YES</option>
				<option class="bg-gray-900">NO</option>
			</select>
			<div class="relative rounded-md shadow-sm">
				<div
					class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<span class="text-gray-500 sm:text-sm"> UTC </span>
				</div>
				<input
					type="text"
					name="price"
					class="block w-full pl-12 pr-12 bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					placeholder="-5" />
			</div>
			<div class="relative rounded-md shadow-sm">
				<div
					class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<span class="text-gray-500 sm:text-sm"> UTC </span>
				</div>
				<input
					type="text"
					name="price"
					class="block w-full pl-12 pr-12 bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					placeholder="+5" />
			</div>
		</div>
	</div>

	<div>
		<label
			for="price"
			class="block mb-1 text-sm font-medium text-gray-300 grid-col-2"
			>Locations</label>
		<div class="grid grid-flow-col gap-2">
			<select
				name="remote"
				class="text-sm text-gray-300 bg-transparent bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
				<option class="bg-gray-900">India</option>
				<option class="bg-gray-900">United States</option>
			</select>
		</div>
	</div>

	<div>
		<label
			for="price"
			class="block mb-1 text-sm font-medium text-gray-300 grid-col-2"
			>HashTags</label>
		<div class="grid grid-flow-col gap-2">
			<select
				name="remote"
				class="text-sm text-gray-300 bg-transparent bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
				<option class="bg-gray-900">JavaScript</option>
				<option class="bg-gray-900">Svelte</option>
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
				name="remote"
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
				name="remote"
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
