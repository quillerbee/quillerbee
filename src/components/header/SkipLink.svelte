<style>
	/* https://codepen.io/andywillekens/pen/zBBpdm */

	.skip-link {
		color: #fff;
		font-weight: 700;
		position: absolute;
		z-index: 2;
		top: -148px;
		left: 0;
		padding: 65px 16px 0;
		transform: translateY(-125%);
		pointer-events: all;
	}

	.skip-link {
		transform: translateY(-125%);
		transition: transform 0.3s;
	}

	.skip-link:focus-within {
		transform: translateY(80%);
	}

	.ribbon.banner {
		width: 90px;
		height: 215px;
		background-color: #fff;
		position: absolute;
		left: 0;
		top: -350px;
		animation: drop forwards 0.8s 1s cubic-bezier(0.165, 0.84, 0.44, 1);
		opacity: 0.2;
		backdrop-filter: blur(10px);
		pointer-events: none;
	}

	.ribbon.banner:before {
		content: "";
		position: absolute;
		z-index: 2;
		left: 0;
		bottom: -45px;
		border-left: 45px solid #fff;
		border-right: 45px solid #fff;
		border-bottom: 45px solid transparent;
	}

	@keyframes drop {
		0% {
			top: -350px;
		}

		100% {
			top: 0;
		}
	}
</style>

<div class="skip-link">
	<div class="mb-2">Skip to</div>
	<a href="#main" class="focus:outline-none">Content</a>
	or
	<a href="#footer" class="focus:outline-none">Footer</a>
	<div class="ribbon banner transform-gpu"></div>
</div>
