<script>
	import { goto } from "@roxi/routify";
	import {
		DayAndNightToggle,
		InteractiveBackground,
		SkipLink,
		CloudWave,
	} from "./";
	import Logo from "../Logo.svelte";
</script>

<style>
	/* https://codepen.io/JavaScriptJunkie/pen/pPRooV */

	.buttons {
		text-align: center;
	}

	.btn-hover {
		font-size: 16px;
		font-weight: 600;
		color: #fff;
		cursor: pointer;
		pointer-events: all;
		height: 40px;
		width: auto;
		padding: 0 20px;
		text-align: center;
		border: none;
		background-size: 300% 100%;
		border-radius: 50px;
		moz-transition: all 0.4s ease-in-out;
		-o-transition: all 0.4s ease-in-out;
		-webkit-transition: all 0.4s ease-in-out;
		transition: all 0.4s ease-in-out;
	}

	.btn-hover:hover {
		background-position: 100% 0;
		moz-transition: all 0.4s ease-in-out;
		-o-transition: all 0.4s ease-in-out;
		-webkit-transition: all 0.4s ease-in-out;
		transition: all 0.4s ease-in-out;
	}

	.btn-hover:focus {
		outline: none;
	}

	.btn-hover.color-3 {
		background-image: linear-gradient(
			to right,
			#667eea,
			#764ba2,
			#6b8dd6,
			#8e37d7
		);
		box-shadow: 0 4px 15px 0 rgba(116, 79, 168, 0.75);
	}

	.frosted-glass {
		background-color: rgba(0, 0, 0, 0.05);
		backdrop-filter: blur(10px);
	}
</style>

<header class="relative w-full mb-16">
	<nav
		class="fixed z-10 flex items-center justify-between w-full h-16 p-5 pointer-events-none frosted-glass">
		<SkipLink />
		<Logo />
		<div class="flex items-center">
			<DayAndNightToggle />
			<button
				on:click="{(e) => {
					$goto('/admin');
					e?.target?.blur();
				}}"
				class="outline-none buttons btn-hover color-3 focus:outline-none focus:ring-2 focus:ring-purple-500">
				Post a Job
			</button>
		</div>
	</nav>
	<InteractiveBackground />
	<CloudWave />
</header>
