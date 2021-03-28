<form
	class="relative flex flex-col px-4 py-5 mb-6 space-y-6 text-white transition-shadow duration-300 ease-in-out bg-gray-900 rounded-lg hover:shadow-lg ribbon-container">
	<span class="ribbon left"> Job Post </span>

	<div class="col-span-6 sm:col-span-3">
		<label for="first_name" class="block text-sm font-medium text-gray-300"
			>Title</label>
		<input
			type="text"
			name="first_name"
			id="first_name"
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
				id="company_website"
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
				<option>USD</option>
				<option>CAD</option>
				<option>EUR</option>
			</select>
			<div class="relative rounded-md shadow-sm">
				<div
					class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<span class="text-gray-500 sm:text-sm"> $ </span>
				</div>
				<input
					type="text"
					name="price"
					id="price"
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
					id="price"
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
				id="remote"
				name="remote"
				class="text-sm text-gray-300 bg-transparent bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
				<option>YES</option>
				<option>NO</option>
			</select>
			<div class="relative rounded-md shadow-sm">
				<div
					class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<span class="text-gray-500 sm:text-sm"> UTC </span>
				</div>
				<input
					type="text"
					name="price"
					id="price"
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
					id="price"
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
				id="remote"
				name="remote"
				class="text-sm text-gray-300 bg-transparent bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
				<option>India</option>
				<option>United States</option>
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
				id="remote"
				name="remote"
				class="text-sm text-gray-300 bg-transparent bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
				<option>JavaScript</option>
				<option>Svelte</option>
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
				id="remote"
				name="remote"
				class="text-sm text-gray-300 bg-transparent bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
				<option>Software Engineer</option>
				<option>Game Developer</option>
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
				id="remote"
				name="remote"
				class="text-sm text-gray-300 bg-transparent bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
				<option>Full Time</option>
				<option>Part Time</option>
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
				id="remote"
				name="remote"
				class="text-sm text-gray-300 bg-transparent bg-gray-800 border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
				<option>Hot</option>
				<option>Urgent</option>
			</select>
		</div>
	</div>

	<div>
		<label for="about" class="block text-sm font-medium text-gray-300">
			Description
		</label>
		<textarea
			id="about"
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
			type="submit"
			class="inline-flex justify-center px-4 py-2 mr-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
			Cancel
		</button>
		<button
			type="submit"
			class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
			Post
		</button>
	</div>
</form>
