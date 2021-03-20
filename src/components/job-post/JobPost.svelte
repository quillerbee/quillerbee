<script>
	let showJobPost = true;
	let showJobLevels = false;

	const togglePostVisibility = () => {
		showJobPost = !showJobPost;
	};

	const toggleLevelVisibility = () => {
		showJobLevels = !showJobLevels;
	};
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

	/* https://codepen.io/crayon-code/pen/vYXpmPB */

	.bookmark {
		width: 37px;
		height: 36px;
	}

	.bookmark:hover .ribbon.up > .content,
	.bookmark:focus .ribbon.up > .content {
		height: 70px;
	}

	.bookmark:hover .ribbon.up,
	.bookmark:focus .ribbon.up {
		top: -20px;
	}

	.ribbon.up {
		position: absolute;
		z-index: 1;
		top: 0;
		right: 5px;
		filter: drop-shadow(2px 3px 2px rgba(0, 0, 0, 0.5));
	}

	.ribbon > .content {
		color: white;
		font-size: 1.25rem;
		text-align: center;
		font-weight: 400;
		background: var(--color, #2ca7d8)
			linear-gradient(
				45deg,
				rgba(0, 0, 0, 0) 0%,
				rgba(255, 255, 255, 0.25) 100%
			);
		padding: 25px 2px 4px;
		clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 100%, 0 100%);
		width: 28px;
		transition: clip-path 1s, padding 1s, background 1s;
	}

	.ribbon.up > .content {
		height: 35px;
		clip-path: polygon(
			0 0,
			100% 0,
			100% 100%,
			50% calc(100% - 8px),
			0 100%
		);
	}

	.ribbon.up,
	.ribbon.up > .content {
		-webkit-transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
		-moz-transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
		-o-transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
		transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
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

	/* https://codepen.io/ahmadbassamemran/pen/zXwZKo */

	.job-levels {
		background: #273057;
		overflow: hidden;
	}

	.job-levels::before {
		content: "";
		position: absolute;
		width: 0;
		height: 0;
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;
		border-top: 10px solid #111827;
		top: -1px;
		right: 15px;
		z-index: 9;
	}

	.job-levels > div {
		padding: 9px 25px;
		color: #fff;
		font-size: 14px;
		border-bottom: 1px solid #394c7f;
		position: relative;
		outline: none;
	}

	.job-levels > div::before {
		position: absolute;
		content: "";
		opacity: 0;
		transition: opacity 0.3s;
	}

	.job-levels > div:hover:before {
		content: "";
		position: absolute;
		height: 0;
		width: 6px;
		left: 0;
		top: 0;
		opacity: 1;
		/* background-color: #d8d824; */
		border-top: 24px solid transparent;
		border-left: 11px solid #27273c;
		border-bottom: 24px solid transparent;
	}

	.job-levels > div:after {
		position: absolute;
		content: "";
		opacity: 0;
		transition: opacity 0.3s;
	}

	.job-levels > div:hover:after {
		content: "";
		position: absolute;
		height: 0;
		width: 6px;
		right: 0px;
		top: 0;
		opacity: 1;
		/* background-color: #d8d824; */
		border-top: 24px solid transparent;
		border-right: 11px solid #27273c;
		border-bottom: 24px solid transparent;
	}

	.job-levels > div:hover {
		background: #273057;
		background: linear-gradient(
			to bottom,
			#273057 0%,
			#273057 50%,
			#394c7f 51%,
			#394c7f 100%
		);
		transition: all 0.3s;
		border-bottom: 1px solid #394c7f;
	}

	.job-levels > div:last-child {
		border: none;
	}

	/* 48 * 3 - 1 */
	.h-3x {
		height: 143px;
	}
</style>

<section
	class="{`relative flex-col pb-0 mb-6 transition-shadow duration-300 ease-in-out bg-gray-900 rounded-lg hover:shadow-lg ${
		showJobPost ? 'flex' : 'hidden'
	}`}">
	<div class="ribbon top-left"><span>popular</span></div>
	<div class="flex items-start justify-between">
		<div class="flex p-5">
			<div
				class="flex items-center justify-center text-4xl font-bold text-center text-gray-900 bg-pink-400 rounded-full w-logo h-logo">
				D
			</div>
			<div class="flex flex-col ml-4 text-left">
				<div class="mb-1">
					<div class="relative flex items-center">
						<div class="mr-2 text-gray-300 truncate">
							Frontend Engineer
						</div>
					</div>
					<div class="flex items-center text-xs text-gray-400">
						Dgraph
						<div class="flex ml-2 text-gray-400">
							<svg
								class="mr-1 fill-current inline-inline-block"
								width="15"
								height="15"
								fill="currentColor">
								<use xlink:href="#users"></use>
							</svg>
							51 - 200
						</div>
					</div>
				</div>
				<div class="flex text-xs font-semibold text-green-800">
					<button
						onclick="this.blur();"
						class="px-2 py-1 mr-2 font-medium text-center bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 w-max rounded-2xl hover:shadow-lg focus:shadow-lg">
						Full Time
					</button>
					<button
						onclick="this.blur();"
						class="px-2 py-1 mr-2 font-medium text-center bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 w-max rounded-2xl hover:shadow-lg focus:shadow-lg">
						Remote
					</button>
				</div>
			</div>
		</div>
		<div class="flex pt-4 pr-5 text-gray-500">
			<button
				onclick="this.blur();"
				class="bookmark relative top-0 left-0 focus:outline-none p-1.5 mr-1 rounded-full transform-gpu">
				<div class="ribbon up" style="--color: #911750;">
					<div class="content"></div>
				</div>
			</button>

			<button
				on:click="{toggleLevelVisibility}"
				class="focus:outline-none focus:ring-2 focus:ring-indigo-400 p-1.5 rounded-full hover:bg-gray-800">
				<svg width="24" height="24">
					{#if showJobLevels}
                        <use xlink:href="#chevron-up"></use>
                    {:else}
                        <use xlink:href="#chevron-down"></use>
                    {/if}
				</svg>
			</button>
		</div>
	</div>
	<div
		class="{`job-levels duration-300 transform-gpu ${
			showJobLevels ? 'h-3x' : 'h-0'
		}`}">
		<div class="flex items-center justify-between transform-gpu">
			<div>Junior Frontend Engineer</div>
			<div>
				<a class="flex items-center text-white" href="/"
					>Apply
					<svg width="14" height="14" class="ml-2">
						<use xlink:href="#external-link"></use>
					</svg>
				</a>
			</div>
		</div>
		<div class="flex items-center justify-between transform-gpu">
			<div>Senior Frontend Engineer</div>
			<div>
				<a class="flex items-center text-white" href="/"
					>Apply
					<svg width="14" height="14" class="ml-2">
						<use xlink:href="#external-link"></use>
					</svg>
				</a>
			</div>
		</div>
		<div class="flex items-center justify-between transform-gpu">
			<div>Lead Frontend Engineer</div>
			<div>
				<a class="flex items-center text-white" href="/"
					>Apply
					<svg width="14" height="14" class="ml-2">
						<use xlink:href="#external-link"></use>
					</svg>
				</a>
			</div>
		</div>
	</div>
	<div
		class="flex justify-between px-5 py-2 text-gray-500 border-t border-gray-800 border-solid">
		<div class="flex items-center justify-between w-full text-xs">
			<div class="flex">
				<div class="flex items-center mr-3">
					<svg class="mr-1 mb-0.5" width="15" height="15">
						<use xlink:href="#briefcase"></use>
					</svg>
					3
				</div>
				<div class="flex items-center justify-center mr-2">
					<svg class="mr-0.5" width="15" height="15">
						<use xlink:href="#hashtag"></use>
					</svg>
					<a
						class="focus:outline-none hover:text-gray-300 focus:text-gray-300"
						href="https://www.quillerbee.com/">
						JavaScript
					</a>
				</div>
				<div class="flex items-center justify-center mr-2">
					<svg class="mr-0.5" width="15" height="15">
						<use xlink:href="#hashtag"></use>
					</svg>
					<a
						class="focus:outline-none hover:text-gray-300 focus:text-gray-300"
						href="https://www.quillerbee.com/">
						Svelte
					</a>
				</div>
			</div>
			<div class="items-center hidden mr-3 sm:flex">
				<span class="text-gray-500">$</span>24k -
				<span class="ml-1 text-gray-500">$</span>40k
			</div>
		</div>
		<div class="flex">
			<button
				onclick="this.blur();"
				class="focus:outline-none focus:ring-2 focus:ring-purple-400 p-1.5 mr-1 rounded-full cursor-pointer hover:bg-gray-800">
				<svg width="24" height="24">
					<use xlink:href="#flag"></use>
				</svg>
			</button>
			<button
				on:click="{togglePostVisibility}"
				class="focus:outline-none focus:ring-2 focus:ring-red-400 p-1.5 rounded-full cursor-pointer hover:bg-gray-800">
				<svg width="24" height="24">
					<use xlink:href="#eye"></use>
				</svg>
			</button>
		</div>
	</div>
</section>

<section
	class="{`relative flex-col pb-0 mb-6 transition-shadow duration-300 ease-in-out bg-gray-900 rounded-lg hover:shadow-lg ${
		showJobPost ? 'hidden' : 'flex'
	}`}">
	<div
		class="flex justify-end px-5 py-2 text-gray-500 border-t border-gray-800 border-solid">
		<button
			on:click="{togglePostVisibility}"
			class="focus:outline-none focus:ring-2 focus:ring-red-400 p-1.5 rounded-full cursor-pointer hover:bg-gray-800">
			<svg width="24" height="24">
				<use xlink:href="#eye-off"></use>
			</svg>
		</button>
	</div>
</section>
