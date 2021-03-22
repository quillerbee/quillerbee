<script>
	import { format } from "timeago.js";
	import chroma from "chroma-js";

	export let jobPost;
	export let company;

	let {
		title,
		locations,
		salary,
		hashtags,
		flag,
		category,
		type,
		url,
		created,
		remote,
		timezone,
	} = jobPost;

	/**
	 * https://stackoverflow.com/a/33076482/9368649
	 */
	let rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");
	let initials = [...company?.name?.matchAll(rgx)] || [];
	initials = (
		(initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")
	).toUpperCase();

	const scale = chroma.scale(["#ff3399", "#fafa6e", "#80ff80"]);
	const scaleMap = {
		FullTime: "1",
		PartTime: "0.9",
		Contract: "0.8",
		Temporary: "0.7",
		Volunteer: "0.6",
		Internship: "0.5",
		Other: "0.4",
	};

	const categoryMap = {
		SoftwareDevelopment: "Software Development",
		QualityAssurance: "Quality Assurance",
		GameDevelopment: "Game Development",
		CustomerSupport: "Customer Support",
		Sales: "Sales",
		Marketing: "Marketing",
		Design: "Design",
		Legal: "Legal",
	};

	const currencyFormatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: salary?.currency,
		compactDisplay: "short",
		notation: "compact",
	});

	const numberFormatter = new Intl.NumberFormat("en-US", {
		signDisplay: "exceptZero",
	});
</script>

<style>
	/* https://www.cssportal.com/css-ribbon-generator/ */

	.ribbon.top-left {
		position: absolute;
		left: -5px;
		top: -5px;
		z-index: 1;
		overflow: hidden;
		width: 75px;
		height: 75px;
		text-align: right;
	}

	.ribbon.top-left span {
		font-size: 10px;
		font-weight: bold;
		color: #fff;
		text-transform: uppercase;
		text-align: center;
		line-height: 20px;
		transform: rotate(-45deg);
		-webkit-transform: rotate(-45deg);
		width: 100px;
		display: block;
		background: #79a70a;
		background: linear-gradient(#9bc90d 0%, #79a70a 100%);
		box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
		position: absolute;
		top: 19px;
		left: -21px;
	}

	.ribbon.top-left span::before {
		content: "";
		position: absolute;
		left: 0px;
		top: 100%;
		z-index: -1;
		border-left: 3px solid #79a70a;
		border-right: 3px solid transparent;
		border-bottom: 3px solid transparent;
		border-top: 3px solid #79a70a;
	}

	.ribbon.top-left span::after {
		content: "";
		position: absolute;
		right: 0px;
		top: 100%;
		z-index: -1;
		border-left: 3px solid transparent;
		border-right: 3px solid #79a70a;
		border-bottom: 3px solid transparent;
		border-top: 3px solid #79a70a;
	}

	.w-logo {
		min-width: 75px;
		width: 75px;
		max-width: 75px;
	}

	.h-logo {
		min-height: 75px;
		height: 75px;
		max-height: 75px;
	}

	ul.locations li {
		margin-right: 5px;
	}
	ul.locations li:not(:first-child)::before {
		content: "| ";
	}
</style>

<section
	class="relative flex-col pb-0 mb-6 transition-shadow duration-300 ease-in-out bg-gray-900 rounded-lg hover:shadow-lg">
	{#if flag}
		<div class="ribbon top-left"><span>{flag}</span></div>
	{/if}
	<div class="flex items-start justify-between">
		<div class="flex p-5">
			<div
				class="flex items-center justify-center text-4xl font-bold text-center text-gray-900 bg-pink-400 rounded-full w-logo h-logo">
				{initials}
			</div>
			<div class="flex flex-col ml-4 text-left">
				<div class="mb-1">
					<div class="relative flex items-center">
						<div class="mr-2 text-gray-300 truncate">
							{title}
						</div>
					</div>
					<div class="flex items-center text-xs text-gray-400">
						{company?.name}
						<div class="flex ml-2 text-gray-400">
							<svg
								class="mr-1 fill-current inline-inline-block"
								width="15"
								height="15">
								<use xlink:href="#location-marker"></use>
							</svg>
							<ul class="flex items-center locations">
								{#each locations as location}
									<li>{location}</li>
								{/each}
								{#if remote}
									<li>
										UTC {numberFormatter?.format(
											timezone?.min
										)}/{numberFormatter?.format(
											timezone?.max
										)}
									</li>
								{/if}
							</ul>
						</div>
					</div>
				</div>
				<div
					class="grid grid-flow-row gap-2 text-xs font-semibold md:grid-flow-col">
					<button
						onclick="this.blur();"
						class="px-2 py-1 font-medium text-center bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 w-max rounded-2xl hover:shadow-lg focus:shadow-lg">
						{currencyFormatter.format(salary?.min)} -
						{currencyFormatter.format(salary?.max)}
					</button>
					<button
						onclick="this.blur();"
						class="flex px-2 py-1 font-medium text-center bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 w-max rounded-2xl hover:shadow-lg focus:shadow-lg">
						<svg class="mr-1" width="15" height="15">
							<use xlink:href="#briefcase"></use>
						</svg>
						{categoryMap[category]}
					</button>
					<button
						onclick="this.blur();"
						class="flex px-2 py-1 font-medium text-center focus:outline-none focus:ring-2 focus:ring-green-500 w-max rounded-2xl hover:shadow-lg focus:shadow-lg"
						style="{`background-color: ${scale(scaleMap[type])};`}">
						<svg class="mr-1" width="15" height="15">
							<use xlink:href="#clock"></use>
						</svg>
						{type}
					</button>
					{#if remote}
						<button
							onclick="this.blur();"
							class="px-2 py-1 font-medium text-center bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 w-max rounded-2xl hover:shadow-lg focus:shadow-lg">
							Remote
						</button>
					{/if}
				</div>
			</div>
		</div>
		<div class="flex pt-4 pr-5">
			<a
				href="{url}"
				target="blank"
				rel="noopener"
				class="flex items-center px-2 text-sm font-bold text-white bg-purple-800 rounded-full focus:outline-none ">
				Apply
				<svg class="ml-2" width="14" height="14">
					<use xlink:href="#external-link"></use>
				</svg>
			</a>
		</div>
	</div>
	<div
		class="flex justify-between px-5 py-2 text-gray-400 border-t border-gray-800 border-solid">
		<div class="flex items-center justify-between text-xs">
			<div class="flex">
				{#each hashtags as hashtag}
					<div class="flex items-center justify-center mr-2">
						<span class="mr-1 text-sm font-bold">#</span>
						<a
							class="focus:outline-none hover:text-gray-300 focus:text-gray-300"
							href="https://www.quillerbee.com/">
							{hashtag?.name}
						</a>
					</div>
				{/each}
			</div>
		</div>
		<div class="flex items-center">
			<div class="text-xs">{format(created)}</div>
		</div>
	</div>
</section>
