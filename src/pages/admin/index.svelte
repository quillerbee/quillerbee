<script>
	import { metatags } from "@roxi/routify";
	import { Loader, LoadMoreBtn, JobPost } from "components";
	import { gql, operationStore, query } from "@urql/svelte";

	metatags.template("title", (title) => `Post a Job - ${title}`);
	const jobs = operationStore(
		gql`
			query GetCompany($input: String!) {
				getCompany(email: $input) {
					email
					name
					jobs {
						id
						title
						description
						locations
						salary {
							min
							max
							currency
						}
						timezone {
							min
							max
						}
						remote
						hashtags {
							name
						}
						category
						type
						status
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

	query(jobs);
</script>

<section
	class="absolute top-0 flex flex-col justify-around w-full p-10 pointer-events-none h-4/5">
	<h1
		class="text-lg font-bold text-white pointer-events-none sm:text-2xl md:text-4xl bottom-36">
		Post a Job
	</h1>
</section>

<div
	class="flex flex-col w-11/12 m-10 mb-10 items-left sm:w-10/12 md:w-9/12 lg:w-8/12">
	{#if $jobs?.fetching}
		<Loader />
	{:else if $jobs?.error}
		<p>Oh no... {$jobs.error.message}</p>
	{:else}
		{#each $jobs?.data?.getCompany?.jobs as jobPost}
			<JobPost jobPost="{jobPost}" company="{$jobs?.data?.getCompany}" />
		{/each}
	{/if}
	<LoadMoreBtn />
</div>
