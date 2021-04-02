const commonTippyConfig = {
	theme: "warn",
	allowHTML: true,
};

export const titleTooltip = {
	...commonTippyConfig,
	content: `
        <b>Title (Required)</b>
        <hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
        <ul class="text-left hex">
            <li>Keep it short & simple.</li>
            <li>Create multiple job posts for multiple roles.</li>
            <li>A job post is limited to a single job.</li>
            <li>Must be a real job.</li>
            <li><b>DO NOT WRITE IN FULL CAPS</b>.</li>
        </ul>`,
};

export const linkTooltip = {
	...commonTippyConfig,
	content: `
		<b>Link (Required)</b>
		<hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
		<ul class="text-left hex">
			<li>A link to your job application site.</li>
			<li>If you don't have one, make it with <a class="inline font-bold" target="_blank" rel="noopener" href="https://www.lever.co/">Lever.co</a>.</li>
		</ul>`,
	interactive: true,
};

export const salaryTooltip = {
	...commonTippyConfig,
	content: `
		<b>Salary (Required)</b>
		<hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
		<ul class="text-left hex">
			<li>Google doesn't index jobs without salary.</li>
			<li>Must be in yearly format.</li>
		</ul>`,
};

export const locationTooltip = {
	...commonTippyConfig,
	content: `
		<b>Location (Required)</b>
		<hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
		<ul class="text-left hex">
			<li>Jobs will be presented to candidates based on location.</li>
			<li>Worldwide positions will get widest exposure.</li>
		</ul>`,
};

export const tagsTooltip = {
	...commonTippyConfig,
	content: `
		<b>Tags (Required)</b>
		<hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
		<ul class="text-left hex">
			<li>Tag the job with your Tech Stack.</li>
			<li>Upto 5 tags are allowed.</li>
			<li>Search and use existing Tags.</li>
			<li>Carefully create new Tag.</li>
			<li>Jobs can be searched with Tags.</li>
		</ul>`,
};

export const categoryTooltip = {
	...commonTippyConfig,
	content: `
		<b>Category (Required)</b>
		<hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
		<ul class="text-left hex">
			<li>Broad Category, the Job belongs to.</li>
			<li>Reach out to us, if we don't conver a Category.</li>
			<li>Job will show up in the selected Category.</li>
		</ul>`,
};

export const jobTypeTooltip = {
	...commonTippyConfig,
	content: `
		<b>Job Type (Required)</b>
		<hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
		<ul class="text-left hex">
			<li>Depicts the Duration & Severity of the Job.</li>
			<li>It will be color coded.</li>
		</ul>`,
};

export const flairTooltip = {
	...commonTippyConfig,
	content: `
		<b>Flair</b>
		<hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
		<ul class="text-left hex">
			<li>Add flair to stand out of the other job posts.</li>
			<li>Costs money to add a flair.</li>
		</ul>`,
};

export const descriptionTooltip = {
	...commonTippyConfig,
	content: `
			<b>Description (Required)</b>
			<hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
			<ul class="text-left hex">
				<li>Describe the responsibilities of the Job.</li>
				<li>Keep it to 1000 letters.</li>
				<li>Use Markdown. See <a class="inline font-bold" target="_blank" rel="noopener" href="https://simplemde.com/markdown-guide">Basic</a> & <a class="inline font-bold" target="_blank" rel="noopener" href="https://www.markdownguide.org/basic-syntax/">Comprehensive</a> guide.</li>
			</ul>`,
	interactive: true,
};

export const nameTooltip = {
	...commonTippyConfig,
	content: `
		<b>Name (Required)</b>
		<hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
		<ul class="text-left hex">
			<li>Your company's brand/trade name.</li>
			<li>Don't keep Inc., Ltd., etc at the end.</li>
		</ul>`,
};

export const emailTooltip = {
	...commonTippyConfig,
	content: `
		<b>Email (Required)</b>
		<hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
		<ul class="text-left hex">
			<li>This is unique id of the company.</li>
			<li>Once it is set, it can't be changed.</li>
			<li>Make sure this email is accessible by you!</li>
			<li>Invoices are sent via this email.</li>
		</ul>`,
};

export const websiteTooltip = {
	...commonTippyConfig,
	content: `
		<b>Website (Required)</b>
		<hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
		<ul class="text-left hex">
			<li>Every business posting job here, must have a Website.</li>
			<li>It adds credibility to the Company.</li>
		</ul>`,
};

export const aboutTooltip = {
	...commonTippyConfig,
	content: `
			<b>About (Required)</b>
			<hr class="my-2 -mx-2 border-yellow-500 border-opacity-50" />
			<ul class="text-left hex">
				<li>Describe what the Company is all about.</li>
				<li>Keep it short.</li>
			</ul>`,
};
