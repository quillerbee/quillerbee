<script>
	import { metatags } from "@roxi/routify";
	import { LoadMoreBtn, JobPost, JobPostSkeleton } from "@components";
	import { gql, operationStore, query } from "@urql/svelte";
	import { CompanyDescription, JobDescription } from "@forms";

	metatags.template("title", (title) => `Post a Job - ${title}`);

	const getCompany = operationStore(
		gql`
			query GetCompany($input: String!) {
				company: getCompany(email: $input) {
					email
					name
					jobs {
						id
						title
						description
						salary {
							min
							max
							currency
						}
						location {
							remote
							worldwide
							countries
							timezone {
								min
								max
							}
							cities {
								name
							}
						}
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
						url
					}
				}
			}
		`,
		{
			input: "abhijit.kar@quillerbee.com",
		}
	);

	query(getCompany);
</script>

<section
	class="absolute top-0 flex flex-col justify-around w-full p-10 pointer-events-none h-3/4">
	<div
		class="relative flex flex-col items-center max-w-3xl px-6 mx-auto text-white">
		<div
			class="flex justify-center items-center mb-5 text-4xl font-bold text-center text-gray-900 bg-pink-400 rounded-full w-[75px] h-[75px]">
			D
		</div>
		<h1 class="mb-3 text-3xl font-bold">Derpy Coder</h1>
		<div class="flex mb-3 text-xs font-semibold">
			<div class="flex mr-2">
				<svg
					class="mr-0.5 text-purple-400"
					width="15"
					height="15"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor">
					<path
						fill-rule="evenodd"
						d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
						clip-rule="evenodd"></path>
				</svg>
				https://www.quillerbee.com
			</div>
			<div class="flex">
				<svg
					class="mr-0.5 text-purple-400"
					xmlns="http://www.w3.org/2000/svg"
					width="15"
					height="15"
					viewBox="0 0 20 20"
					fill="currentColor">
					<path
						fill-rule="evenodd"
						d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
						clip-rule="evenodd"></path>
				</svg>
				abhijit.kar@derpycoder.com
			</div>
		</div>
		<blockquote class="text-center">
			If you're someone, just starting out in the industry or looking to
			better yourself or trying to find your way in life. You have come to
			the right place!
		</blockquote>
	</div>
</section>

<div
	class="flex flex-col w-11/12 m-10 mb-10 text-left items-left sm:w-10/12 md:w-9/12 lg:w-8/12">
	<CompanyDescription />
	<JobDescription />
	{#if $getCompany.fetching}
		<JobPostSkeleton />
	{:else if $getCompany.error}
		<p>Oh no... {$getCompany.error.message}</p>
	{:else if !$getCompany.data.company || $getCompany.data.company.jobs.length === 0}
		<p>Doh...</p>
	{:else}
		{#each $getCompany.data.company.jobs as jobPost}
			<JobPost jobPost="{jobPost}" company="{$getCompany.data.company}" />
		{/each}
	{/if}
	<LoadMoreBtn />
</div>
