<script>
	import { metatags } from "@roxi/routify";
	import { gql, operationStore, query } from "@urql/svelte";
	import { LoadMoreBtn, JobPost, JobPostSkeleton } from "@components";

	metatags.template("title", (title) => `Jobs - ${title}`);

	const getJobs = operationStore(gql`
		query GetJobs {
			jobs: queryJob {
				company {
					name
				}
				title
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
				tags {
					name
				}
				category {
					name
				}
				type
				flair
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
		<JobPostSkeleton />
	{:else if $getJobs.error}
		<p>Oh no... {$getJobs.error.message}</p>
	{:else if $getJobs.data.jobs.length === 0}
		<p>Doh...</p>
	{:else}
		{#each $getJobs.data.jobs as jobPost}
			<JobPost jobPost="{jobPost}" company="{jobPost?.company}" />
		{/each}
	{/if}
	<LoadMoreBtn />
</div>
