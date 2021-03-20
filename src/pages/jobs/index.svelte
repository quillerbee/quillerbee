<script>
	import { metatags } from "@roxi/routify";
	import { Loader, LoadMoreBtn, JobPost } from "components";

	metatags.template("title", (title) => `Jobs - ${title}`);

	const jobs = [
		{
			position: "Frontend Engineer",
			company: {
				name: "Dgraph",
			},
			flairs: ["Fulltime", "Remote"],
			tags: ["JavaScript", "Svelte"],
			flag: "Urgent",
			url: "/",
			datePosted: "2021-03-20T17:28:18.619Z",
		},
		{
			position: "Backend Engineer",
			company: {
				name: "Ghost",
			},
			flairs: ["Partime", "Remote"],
			tags: ["JavaScript", "React"],
			url: "/",
			datePosted: "2021-03-19T17:28:18.619Z",
		},
	];
</script>

<div
	class="flex flex-col w-11/12 m-10 mb-10 items-left lg:ml-0 sm:w-10/12 md:w-9/12 lg:w-8/12">
	{#each jobs as jobPost}
		<JobPost {...jobPost} />
	{/each}
	<LoadMoreBtn />
	<Loader />
</div>
