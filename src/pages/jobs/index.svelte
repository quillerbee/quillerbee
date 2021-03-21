<script>
	import { metatags } from "@roxi/routify";
	import { Loader, LoadMoreBtn, JobPost } from "components";

	metatags.template("title", (title) => `Jobs - ${title}`);

	const jobs = [
		{
			title: "Frontend Engineer",
			company: {
				name: "Dgraph",
			},
			flairs: ["Parttime", "Office"],
			tags: ["JavaScript", "Svelte"],
			flag: "Urgent",
			url: "/",
			created: "2021-03-20T17:28:18.619Z",
		},
		{
			title: "Backend Engineer",
			company: {
				name: "Ghost",
			},
			flairs: ["Fulltime", "Remote"],
			tags: ["JavaScript", "React"],
			url: "/",
			created: "2021-03-19T17:28:18.619Z",
		},
	];
</script>

<div
	class="flex flex-col w-11/12 m-10 mb-10 items-left sm:w-10/12 md:w-9/12 lg:w-8/12">
	{#each jobs as jobPost}
		<JobPost {...jobPost} />
	{/each}
	<LoadMoreBtn />
	<Loader />
</div>
