<script>
	import { metatags } from "@roxi/routify";
	import { Loader, LoadMoreBtn, JobPost } from "components";
	import { gql, operationStore, query } from "@urql/svelte";

	metatags.template("title", (title) => `Jobs - ${title}`);

	const jobs = operationStore(gql`
		query GetJobs {
			queryJob {
				company {
					name
				}
				title
				locations
				salary {
					min
					max
					currency
				}
				remote
				timezone {
					min
					max
				}
				hashtags {
					name
				}
				category
				type
				url
				created
			}
		}
	`);

	query(jobs);
</script>

<div
	class="flex flex-col w-11/12 m-10 mb-10 items-left sm:w-10/12 md:w-9/12 lg:w-8/12">
	{#if $jobs.fetching}
		<Loader />
	{:else if $jobs.error}
		<p>Oh no... {$jobs.error.message}</p>
	{:else}
		{#each $jobs.data.queryJob as jobPost}
			<JobPost {jobPost} />
		{/each}
	{/if}
	<LoadMoreBtn />
</div>
