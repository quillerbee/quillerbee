<script>
	import { metatags } from "@roxi/routify";
	import { Loader, LoadMoreBtn, JobPost } from "components";
	import { gql, operationStore, query } from "@urql/svelte";

	metatags.template("title", (title) => `Jobs - ${title}`);

	const getJobs = operationStore(gql`
		query GetJobs {
			jobPosts:queryJob {
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
				category {
					name
				}
				type
				url
				created
			}
		}
	`);

	query(getJobs);
</script>

<div
	class="flex flex-col w-11/12 m-10 mb-10 items-left sm:w-10/12 md:w-9/12 lg:w-8/12">
	{#if $getJobs.fetching}
		<Loader />
	{:else if $getJobs.error}
		<p>Oh no... {$getJobs.error.message}</p>
	{:else}
		{#each $getJobs.data.jobPosts as jobPost}
			<JobPost jobPost="{jobPost}" company="{jobPost?.company}" />
		{/each}
	{/if}
	<LoadMoreBtn />
</div>
