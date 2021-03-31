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
			<label for="name" class="block text-sm font-medium text-gray-300"
				>Name</label>
			<input
				type="text"
				id="name"
				name="name"
				autocomplete="name"
				placeholder="Company Name"
				class="block w-full mt-1 bg-gray-800 border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
			<p class="hidden mt-2 text-xs text-gray-400">
				Your company's brand/trade name: without Inc., Ltd., B.V., Pte.,
				etc.
			</p>
		</div>

		<div>
			<label for="email" class="block text-sm font-medium text-gray-300"
				>Email</label>
			<input
				id="email"
				type="text"
				name="email"
				autocomplete="email"
				readonly="true"
				disabled="true"
				placeholder="you@example.com"
				class="block w-full mt-1 bg-gray-800 border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
			<p class="hidden mt-2 text-xs text-gray-400">
				This email is public, Make sure this email is accessible by you!
				It's the unique identifier for the company.
			</p>
		</div>

		<div>
			<label
				for="website"
				class="block text-sm font-medium text-gray-300">
				Website
			</label>
			<input
				type="text"
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
		<label for="about" class="block text-sm font-medium text-gray-300">
			About
		</label>
		<textarea
			id="about"
			name="about"
			rows="3"
			class="block w-full mt-1 bg-gray-800 border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			placeholder="Describe your Company, but keep it short."></textarea>
		<p class="hidden mt-2 text-xs text-gray-400">
			Brief description for your profile. You can use markdown to add
			pizzaz to the description.
		</p>
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
