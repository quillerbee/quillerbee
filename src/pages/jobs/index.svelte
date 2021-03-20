<script>
	import { metatags } from "@roxi/routify";
	import { Loader, LoadMoreBtn, JobPost } from "components";

	metatags.template("title", (title) => `Jobs - ${title}`);
</script>

<div
	class="flex flex-col w-11/12 m-10 mb-10 items-left lg:ml-0 sm:w-10/12 md:w-9/12 lg:w-8/12">
	<h2 class="inline-flex w-auto mb-6 text-xl font-bold text-left text-white">
		<a href="https://www.quillerbee.com/" class="focus:outline-none"
			>Software Development (3)</a>
	</h2>
	<JobPost />
	<JobPost />
	<h2 class="inline-flex w-auto my-6 text-xl font-bold text-left text-white">
		<a href="https://www.quillerbee.com/" class="focus:outline-none"
			>Game Development (1)</a>
	</h2>
	<JobPost />
	<LoadMoreBtn />
	<Loader />
</div>
