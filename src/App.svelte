<script>
	import { onMount } from 'svelte';
	import Typewriter from 'typewriter-effect/dist/core';

	var typewriter = document.getElementById('typewriter');

	var typewriter = new Typewriter(typewriter, {
		loop: true,
		delay: 75,
	});

	typewriter
		.pauseFor(1000)
		.typeString('Looking for Jobs')
		.pauseFor(300)
		.deleteChars(4)
		.typeString('Remote Jobs')
		.pauseFor(1000)
		.deleteChars(11)
		.typeString('Indie Gigs')
		.pauseFor(1000)
		.deleteChars(10)
		.typeString('Fulltime Opportunities')
		.pauseFor(1000)
		.changeDeleteSpeed(1)
		.deleteChars(30)
		.typeString(' no further')
		.pauseFor(1000)
		.deleteAll()
		.typeString('We have <span style="color: #A2CD48;">handpicked</span> them for you!')
		.pauseFor(1000)
		.changeDeleteSpeed(1)
		.deleteAll()
		.typeString('Welcome to <strong style="color: yellow;">Quiller Bee</strong>')
		.pauseFor(1000)
		.start();



	// https://codepen.io/hakimel/pen/bzrZGo
	const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8,
		STAR_SIZE = 3,
		STAR_MIN_SCALE = 0.2,
		OVERFLOW_THRESHOLD = 50;

	let canvas, context;

	let scale = 1, // device pixel ratio
		width,
		height;

	let stars = [];

	let pointerX,
		pointerY;

	let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };

	let touchInput = false;

	onMount(() => {
		context = canvas.getContext('2d');
		canvas.onmousemove = onMouseMove;
		// canvas.ontouchmove = onTouchMove;
		canvas.ontouchend = onMouseLeave;
		document.onmouseleave = onMouseLeave;
		resize();
		step();
	});

	generate();

	window.onresize = resize;


	function generate() {

		for (let i = 0; i < STAR_COUNT; i++) {
			stars.push({
				x: 0,
				y: 0,
				z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE)
			});
		}

	}

	function placeStar(star) {

		star.x = Math.random() * width;
		star.y = Math.random() * height;

	}

	function recycleStar(star) {

		let direction = 'z';

		let vx = Math.abs(velocity.x),
			vy = Math.abs(velocity.y);

		if (vx > 1 || vy > 1) {
			let axis;

			if (vx > vy) {
				axis = Math.random() < vx / (vx + vy) ? 'h' : 'v';
			}
			else {
				axis = Math.random() < vy / (vx + vy) ? 'v' : 'h';
			}

			if (axis === 'h') {
				direction = velocity.x > 0 ? 'l' : 'r';
			}
			else {
				direction = velocity.y > 0 ? 't' : 'b';
			}
		}

		star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

		if (direction === 'z') {
			star.z = 0.1;
			star.x = Math.random() * width;
			star.y = Math.random() * height;
		}
		else if (direction === 'l') {
			star.x = -OVERFLOW_THRESHOLD;
			star.y = height * Math.random();
		}
		else if (direction === 'r') {
			star.x = width + OVERFLOW_THRESHOLD;
			star.y = height * Math.random();
		}
		else if (direction === 't') {
			star.x = width * Math.random();
			star.y = -OVERFLOW_THRESHOLD;
		}
		else if (direction === 'b') {
			star.x = width * Math.random();
			star.y = height + OVERFLOW_THRESHOLD;
		}

	}

	function resize() {

		scale = window.devicePixelRatio || 1;

		width = window.innerWidth * scale;
		height = window.innerHeight * scale;

		canvas.width = width;
		canvas.height = height;

		stars.forEach(placeStar);

	}

	function step() {

		context.clearRect(0, 0, width, height);

		update();
		render();

		requestAnimationFrame(step);

	}

	function update() {

		velocity.tx *= 0.76; // Previously 0.96
		velocity.ty *= 0.76;

		velocity.x += (velocity.tx - velocity.x) * 0.8;
		velocity.y += (velocity.ty - velocity.y) * 0.8;

		stars.forEach((star) => {

			star.x += velocity.x * star.z;
			star.y += velocity.y * star.z;

			star.x += (star.x - width / 2) * velocity.z * star.z;
			star.y += (star.y - height / 2) * velocity.z * star.z;
			star.z += velocity.z;

			// recycle when out of bounds
			if (star.x < -OVERFLOW_THRESHOLD || star.x > width + OVERFLOW_THRESHOLD || star.y < -OVERFLOW_THRESHOLD || star.y > height + OVERFLOW_THRESHOLD) {
				recycleStar(star);
			}

		});

	}

	function render() {

		stars.forEach((star) => {

			context.beginPath();
			context.lineCap = 'round';
			context.lineWidth = STAR_SIZE * star.z * scale;
			context.strokeStyle = 'rgba(255,255,255,' + (0.5 + 0.5 * Math.random()) + ')';

			context.beginPath();
			context.moveTo(star.x, star.y);

			var tailX = velocity.x * 2,
				tailY = velocity.y * 2;

			// stroke() wont work on an invisible line
			if (Math.abs(tailX) < 0.1) tailX = 0.5;
			if (Math.abs(tailY) < 0.1) tailY = 0.5;

			context.lineTo(star.x + tailX, star.y + tailY);

			context.stroke();

		});

	}

	function movePointer(x, y) {

		if (typeof pointerX === 'number' && typeof pointerY === 'number') {

			let ox = x - pointerX,
				oy = y - pointerY;

			velocity.tx = velocity.tx + (ox / 8 * scale) * (touchInput ? 1 : -1);
			velocity.ty = velocity.ty + (oy / 8 * scale) * (touchInput ? 1 : -1);

		}

		pointerX = x;
		pointerY = y;

	}

	function onMouseMove(event) {

		touchInput = false;

		movePointer(event.clientX, event.clientY);

	}

	function onTouchMove(event) {

		touchInput = true;

		movePointer(event.touches[0].clientX, event.touches[0].clientY, true);

		event.preventDefault();

	}

	function onMouseLeave() {

		pointerX = null;
		pointerY = null;

	}

</script>


<header class="relative w-full mb-16">
	<nav class="fixed z-10 flex items-center justify-between w-full h-16 p-5 pointer-events-none frosted-glass">
		<div class="skip-link">
			<div class="mb-2">Skip to</div>
			<a href="#main" class="focus:outline-none">Content</a> or
			<a href="#footer" class="focus:outline-none">Footer</a>
			<div class="ribbon banner transform-gpu"></div>
		</div>
		<svg viewBox="-2 0 177 200" class="absolute z-10 text-gray-900 left-5" height="50" width="50" version="1.1"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
				fill="#14141f"></path>
		</svg>
		<svg class="z-20 w-10 h-10 p-2 ml-1.5 rounded-full" xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="120 120 256 256">
			<defs>
				<path id="a"
					d="M271.34 350.42c-2.16-2.22-5.99-12.61-6.61-17.54-.61-4.93 1.92-9.23 5.3-9.51 2.25-.19 3.86 1.21 4.83 4.22-.91 16.69-2.08 24.3-3.52 22.83z" />
				<path id="b"
					d="M224.06 357.51c-2.76-3.69-7.34-21.3-7.92-29.72-.57-8.41 2.99-15.9 7.48-16.55 3-.44 5.07 1.9 6.21 7-2.01 28.63-3.93 41.72-5.77 39.27z" />
				<path id="c"
					d="M177.16 363.7c-2.89-3.86-7.69-22.29-8.29-31.1-.6-8.8 3.13-16.63 7.83-17.32 3.13-.45 5.3 1.99 6.49 7.32-2.1 29.97-4.11 43.67-6.03 41.1z" />
				<path id="d" d="M361.5 280l26.5-4.32-25-10.5" />
				<path id="e"
					d="M286.5 154.7c-5.67-31.24-28.59-39.95-37.59-40.54-8.99-.58-25.59 14.08-14.06 53.26 7.68 26.13 21.5 40.01 41.46 41.65 10.58-15.41 13.98-33.54 10.19-54.37z" />
				<path id="f"
					d="M252.5 340.18c82-1.5 109-45.5 110-68.18S354 185.68 248 184s-120.62 54.63-120 83.68c1.13 49.04 42.5 74 124.5 72.5z" />
				<path id="g"
					d="M324.5 201.68c-2.68-.84 9.87 13.38 13.46 28.39s3.05 18.55 3.54 29.61c.54 12.06.38 19.57-5.5 36.32-3.92 11.17-9.92 21.39-18 30.68L293 336c23-16.88 34.67-41.82 35-74.82s-11.17-57-34.5-72c17 5.83 27.33 10 31 12.5z" />
				<path id="h" d="M168 251a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
				<path id="i"
					d="M293.5 362.06c2.56-2.67 7.92-16.23 9.19-22.87 1.28-6.64-.83-12.94-4.34-13.9-2.34-.64-4.21 1.02-5.61 4.96-1.2 22.98-.94 33.58.76 31.81z" />
				<path id="j"
					d="M216.5 338.75c19.06.59 40.5 1.6 52.75 1.43C291 319.51 316 299.5 312 250.5s-44.87-63.21-50.75-66.5c-17.37-.79-36.29.78-55.45 3 10.64-.18 25 1.21 37.2 7.48 15 7.66 43 26.5 46 54.66 3 28.17-1.67 47.67-21 64.67s-30.06 24.1-51.5 24.94z" />
				<path id="k"
					d="M252 340c52-2.12 74.31-10.5 98.33-41.83-19.64 6.33-44.02 20.83-92 21.83-20.62.43-38.88 2.81-58.33 1.77-19.45-1.03-47.73-11.37-56-14.44 23.16 25.29 56 34.8 108 32.67z" />
				<path id="l"
					d="M320 182.18c26.5-17.5 25.5-42 22.5-50.5s-23-18-54.5 8c-21 17.33-28.33 35.5-22 54.5 18.33 3.66 36.33-.34 54-12z" />
				<path id="m"
					d="M328.43 346.9c2.56-2.67 8.72-17.83 9.99-24.47 1.28-6.64 2.29-8.47-1.22-9.43-2.34-.64-5.38 2.36-9.13 9-1.46 18.38-1.34 26.68.36 24.9z" />
				<path id="n"
					d="M240 368c3.33-3.48 10.33-21.19 12-29.86 1.67-8.66-1.08-16.89-5.67-18.14-3.05-.83-5.5 1.33-7.33 6.48-1.56 30-1.22 43.84 1 41.52z" />
				<path id="o" d="M233.5 251.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
			</defs>
			<use fill="#2e2514" xlink:href="#a" />
			<use fill="none" stroke="#161008" stroke-width="4" xlink:href="#a" />
			<path fill="#161008"
				d="M187.64 282.8c0 1-.85 1.81-1.9 1.81s-1.91-.81-1.91-1.81c0-.99.86-1.8 1.91-1.8s1.9.81 1.9 1.8z" />
			<use fill="#2e2514" xlink:href="#b" />
			<use fill="none" stroke="#161008" stroke-width="4" xlink:href="#b" />
			<path fill="#161008"
				d="M211.12 283.37c0 1.04-.89 1.88-1.98 1.88s-1.97-.84-1.97-1.88c0-1.03.88-1.87 1.97-1.87s1.98.84 1.98 1.87z" />
			<path fill="#161008" fill-opacity=".13"
				d="M356.44 372.25c0 13.66-45.8 24.75-102.22 24.75S152 385.91 152 372.25s45.8-24.75 102.22-24.75 102.22 11.09 102.22 24.75z" />
			<use fill="#2e2514" xlink:href="#c" />
			<use fill="none" stroke="#161008" stroke-width="4" xlink:href="#c" />
			<use fill="#2e2514" xlink:href="#d" />
			<use fill="none" stroke="#161008" stroke-width="4" xlink:href="#d" />
			<use fill="#bbe0e5" opacity=".5" xlink:href="#e" />
			<use fill="none" stroke="#adc9ca" stroke-width="2" opacity=".5" xlink:href="#e" />
			<use fill="#ffe74f" xlink:href="#f" />
			<use fill="none" stroke="#161008" stroke-width="4" xlink:href="#f" />
			<use fill="#2a1a12" xlink:href="#g" />
			<use fill="none" stroke="#161008" stroke-width="3" xlink:href="#g" />
			<use xlink:href="#h" />
			<use fill="none" xlink:href="#h" />
			<use fill="#2e2514" xlink:href="#i" />
			<use fill="none" stroke="#161008" stroke-width="4" xlink:href="#i" />
			<path fill="none" stroke="#161008" stroke-width="4" d="M209.5 283.18c-11.5 7.37-19 4.62-24-.5" />
			<use fill="#2a1a12" xlink:href="#j" />
			<use fill="none" stroke="#161008" stroke-width="4" xlink:href="#j" />
			<use fill-opacity=".23" xlink:href="#k" />
			<use fill="none" xlink:href="#k" />
			<use fill="#bbe0e5" opacity=".5" xlink:href="#l" />
			<use fill="none" stroke="#adc9ca" stroke-width="2" opacity=".5" xlink:href="#l" />
			<use fill="#2e2414" xlink:href="#m" />
			<use fill="none" stroke="#161008" stroke-width="4" xlink:href="#m" />
			<use fill="#2e2514" xlink:href="#n" />
			<use fill="none" stroke="#161008" stroke-width="4" xlink:href="#n" />
			<use xlink:href="#o" />
			<use fill="none" xlink:href="#o" />
		</svg>
		<div class="flex items-center">
			<div class="day-and-night-toggle">
				<input type="checkbox" class="focus:outline-none" id="dn" checked />
				<label for="dn" class="toggle">
					<span class="toggle__handler">
						<span class="crater crater--1"></span>
						<span class="crater crater--2"></span>
						<span class="crater crater--3"></span>
					</span>
					<span class="star star--1"></span>
					<span class="star star--2"></span>
					<span class="star star--3"></span>
					<span class="star star--4"></span>
					<span class="star star--5"></span>
					<span class="star star--6"></span>
				</label>
			</div>
			<button onclick="this.blur();"
				class="outline-none buttons btn-hover color-3 focus:outline-none focus:ring-2 focus:ring-purple-500">
				Post a Job
			</button>
		</div>
	</nav>
	<section class="absolute top-0 flex flex-col justify-around w-full h-full p-10 pointer-events-none">
		<div class="relative max-w-3xl px-6 mx-auto">
			<div class="absolute top-0 left-0 flex items-center h-10 pl-10 mt-1">
				<svg class="w-4 h-4 text-gray-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
					<path
						d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z">
					</path>
				</svg>
			</div>
			<input id="search-toggle" type="search" placeholder="Enter search term ('/' to focus)"
				class="inline-block w-full py-3 pl-12 pr-4 font-bold text-gray-700 bg-gray-100 rounded-lg pointer-events-auto focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-20">
			<label for="search-toggle"
				class="absolute text-xs italic font-semibold text-white -bottom-4 right-8">Powered by
				Dgraph</label>
			<div class="mt-1">
				<div id="search-content" class="z-10 w-full overflow-y-auto text-gray-600 rounded-lg text"
					style="max-height: 500px;">
					<div id="searchresults" class="h-auto max-w-3xl mx-auto"></div>

					<!-- No search results message-->
					<div id="nosearchresults" class="flex hidden px-6 pb-6 bg-white">
						<svg class="w-6 h-6 text-indigo-600 fill-current" xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20">
							<path
								d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z">
							</path>
						</svg>
						<span class="ml-4 font-bold"> Oops, no search results!!!1</span>
					</div>
					<!-- / No search results -->
				</div>
			</div>
		</div>
		<h1 id="typewriter" class="text-lg font-bold text-white pointer-events-none sm:text-2xl md:text-4xl bottom-36">
		</h1>
	</section>
	<canvas class="w-full h-full" bind:this={canvas}></canvas>
	<svg class="absolute bottom-0 pointer-events-none" viewBox="0 0 1428 174" version="1.1"
		xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
		<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
			<g transform="translate(-2.000000, 44.000000)" fill="#27273c" fill-rule="nonzero">
				<path
					d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
					opacity="0.100000001"></path>
				<path
					d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
					opacity="0.100000001"></path>
				<path
					d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
					id="Path-4" opacity="0.200000003"></path>
			</g>
			<g transform="translate(-4.000000, 76.000000)" fill="#27273c" fill-rule="nonzero">
				<path
					d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z">
				</path>
			</g>
		</g>
	</svg>
</header>

<nav>
	<section class="mb-10 text-gray-900 beehive">
		<div class="flex justify-center honeycomb">
			<button class="relative hex focus:outline-none" onclick="this.blur();">
				<svg class="transition-all duration-200 fill transform-gpu" viewBox="-2 0 177 200" height="150"
					width="124" version="1.1" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
						fill="currentColor"></path>
				</svg>
				<svg class="absolute top-0 transform-gpu stroke" viewBox="-2 0 177 200" height="150" width="124"
					version="1.1" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z">
					</path>
				</svg>
				<svg class="absolute top-0 transform-gpu thick-stroke" viewBox="-5 0 182 200" height="150" width="124"
					version="1.1" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z">
					</path>
				</svg>
				<div class="absolute top-0 flex flex-col items-center w-full h-full pt-10 text-xs transform-gpu">
					<svg class="mb-3 text-gray-400 icon" width="35" height="35" aria-hidden="true" focusable="false"
						data-prefix="fas" data-icon="rocket" role="img" xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512">
						<path fill="currentColor"
							d="M505.12019,19.09375c-1.18945-5.53125-6.65819-11-12.207-12.1875C460.716,0,435.507,0,410.40747,0,307.17523,0,245.26909,55.20312,199.05238,128H94.83772c-16.34763.01562-35.55658,11.875-42.88664,26.48438L2.51562,253.29688A28.4,28.4,0,0,0,0,264a24.00867,24.00867,0,0,0,24.00582,24H127.81618l-22.47457,22.46875c-11.36521,11.36133-12.99607,32.25781,0,45.25L156.24582,406.625c11.15623,11.1875,32.15619,13.15625,45.27726,0l22.47457-22.46875V488a24.00867,24.00867,0,0,0,24.00581,24,28.55934,28.55934,0,0,0,10.707-2.51562l98.72834-49.39063c14.62888-7.29687,26.50776-26.5,26.50776-42.85937V312.79688c72.59753-46.3125,128.03493-108.40626,128.03493-211.09376C512.07526,76.5,512.07526,51.29688,505.12019,19.09375ZM384.04033,168A40,40,0,1,1,424.05,128,40.02322,40.02322,0,0,1,384.04033,168Z">
						</path>
					</svg>
					<div class="font-semibold text-gray-300 uppercase title">Startups</div>
				</div>
			</button>
			<button class="relative hidden lg:block hex focus:outline-none" onclick="this.blur();">
				<svg class="transform-gpu fill" viewBox="-2 0 177 200" height="150" width="124" version="1.1"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
						fill="currentColor"></path>
				</svg>
				<svg class="absolute top-0 transform-gpu stroke" viewBox="-2 0 177 200" height="150" width="124"
					version="1.1" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z">
					</path>
				</svg>
				<svg class="absolute top-0 transform-gpu thick-stroke" viewBox="-5 0 182 200" height="150" width="124"
					version="1.1" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z">
					</path>
				</svg>
				<div class="absolute top-0 flex flex-col items-center w-full h-full pt-10 text-xs transform-gpu">
					<svg class="mb-3 text-gray-400 icon" width="90" height="35" aria-hidden="true" focusable="false"
						data-prefix="fas" data-icon="gamepad" role="img" xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 640 512">
						<path fill="currentColor"
							d="M480.07 96H160a160 160 0 1 0 114.24 272h91.52A160 160 0 1 0 480.07 96zM248 268a12 12 0 0 1-12 12h-52v52a12 12 0 0 1-12 12h-24a12 12 0 0 1-12-12v-52H84a12 12 0 0 1-12-12v-24a12 12 0 0 1 12-12h52v-52a12 12 0 0 1 12-12h24a12 12 0 0 1 12 12v52h52a12 12 0 0 1 12 12zm216 76a40 40 0 1 1 40-40 40 40 0 0 1-40 40zm64-96a40 40 0 1 1 40-40 40 40 0 0 1-40 40z">
						</path>
					</svg>
					<div class="font-semibold text-gray-300 uppercase title">Game Dev</div>
				</div>
			</button>
			<button class="relative hex focus:outline-none" onclick="this.blur();">
				<svg class="transform-gpu fill" viewBox="-2 0 177 200" height="150" width="124" version="1.1"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
						fill="currentColor"></path>
				</svg>
				<svg class="absolute top-0 transform-gpu stroke" viewBox="-2 0 177 200" height="150" width="124"
					version="1.1" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z">
					</path>
				</svg>
				<svg class="absolute top-0 transform-gpu thick-stroke" viewBox="-5 0 182 200" height="150" width="124"
					version="1.1" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z">
					</path>
				</svg>
				<div class="absolute top-0 flex flex-col items-center w-full h-full pt-10 text-xs transform-gpu">
					<svg class="mb-3 text-gray-400 icon" width="35" height="35" aria-hidden="true" focusable="false"
						data-prefix="fas" data-icon="laptop-house" role="img" xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 640 512">
						<path fill="currentColor"
							d="M272,288H208a16,16,0,0,1-16-16V208a16,16,0,0,1,16-16h64a16,16,0,0,1,16,16v37.12C299.11,232.24,315,224,332.8,224H469.74l6.65-7.53A16.51,16.51,0,0,0,480,207a16.31,16.31,0,0,0-4.75-10.61L416,144V48a16,16,0,0,0-16-16H368a16,16,0,0,0-16,16V87.3L263.5,8.92C258,4,247.45,0,240.05,0s-17.93,4-23.47,8.92L4.78,196.42A16.15,16.15,0,0,0,0,207a16.4,16.4,0,0,0,3.55,9.39L22.34,237.7A16.22,16.22,0,0,0,33,242.48,16.51,16.51,0,0,0,42.34,239L64,219.88V384a32,32,0,0,0,32,32H272ZM629.33,448H592V288c0-17.67-12.89-32-28.8-32H332.8c-15.91,0-28.8,14.33-28.8,32V448H266.67A10.67,10.67,0,0,0,256,458.67v10.66A42.82,42.82,0,0,0,298.6,512H597.4A42.82,42.82,0,0,0,640,469.33V458.67A10.67,10.67,0,0,0,629.33,448ZM544,448H352V304H544Z">
						</path>
					</svg>
					<div class="font-semibold text-gray-300 uppercase title">Remote</div>
				</div>
			</button>
			<button class="relative hidden lg:block hex focus:outline-none" onclick="this.blur();">
				<svg class="transform-gpu fill" viewBox="-2 0 177 200" height="150" width="124" version="1.1"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
						fill="currentColor"></path>
				</svg>
				<svg class="absolute top-0 transform-gpu stroke" viewBox="-2 0 177 200" height="150" width="124"
					version="1.1" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z">
					</path>
				</svg>
				<svg class="absolute top-0 transform-gpu thick-stroke" viewBox="-5 0 182 200" height="150" width="124"
					version="1.1" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z">
					</path>
				</svg>
				<div class="absolute top-0 flex flex-col items-center w-full h-full pt-10 text-xs transform-gpu">
					<svg class="mb-3 text-gray-400 icon" width="35" height="35" aria-hidden="true" focusable="false"
						data-prefix="fas" data-icon="paint-brush" role="img" xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512">
						<path fill="currentColor"
							d="M167.02 309.34c-40.12 2.58-76.53 17.86-97.19 72.3-2.35 6.21-8 9.98-14.59 9.98-11.11 0-45.46-27.67-55.25-34.35C0 439.62 37.93 512 128 512c75.86 0 128-43.77 128-120.19 0-3.11-.65-6.08-.97-9.13l-88.01-73.34zM457.89 0c-15.16 0-29.37 6.71-40.21 16.45C213.27 199.05 192 203.34 192 257.09c0 13.7 3.25 26.76 8.73 38.7l63.82 53.18c7.21 1.8 14.64 3.03 22.39 3.03 62.11 0 98.11-45.47 211.16-256.46 7.38-14.35 13.9-29.85 13.9-45.99C512 20.64 486 0 457.89 0z">
						</path>
					</svg>
					<div class="font-semibold text-gray-300 uppercase title">Design</div>
				</div>
			</button>
			<button class="relative focus:outline-none hex" onclick="this.blur();">
				<svg class="transform-gpu fill" viewBox="-2 0 177 200" height="150" width="124" version="1.1"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
						fill="currentColor"></path>
				</svg>
				<svg class="absolute top-0 transform-gpu stroke" viewBox="-2 0 177 200" height="150" width="124"
					version="1.1" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z">
					</path>
				</svg>
				<svg class="absolute top-0 transform-gpu thick-stroke" viewBox="-5 0 182 200" height="150" width="124"
					version="1.1" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z">
					</path>
				</svg>
				<div class="absolute top-0 flex flex-col items-center w-full h-full pt-10 text-xs transform-gpu">
					<svg class="mb-3 text-gray-400 icon" width="35" height="35" aria-hidden="true" focusable="false"
						data-prefix="fas" data-icon="headset" role="img" xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512">
						<path fill="currentColor"
							d="M192 208c0-17.67-14.33-32-32-32h-16c-35.35 0-64 28.65-64 64v48c0 35.35 28.65 64 64 64h16c17.67 0 32-14.33 32-32V208zm176 144c35.35 0 64-28.65 64-64v-48c0-35.35-28.65-64-64-64h-16c-17.67 0-32 14.33-32 32v112c0 17.67 14.33 32 32 32h16zM256 0C113.18 0 4.58 118.83 0 256v16c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-16c0-114.69 93.31-208 208-208s208 93.31 208 208h-.12c.08 2.43.12 165.72.12 165.72 0 23.35-18.93 42.28-42.28 42.28H320c0-26.51-21.49-48-48-48h-32c-26.51 0-48 21.49-48 48s21.49 48 48 48h181.72c49.86 0 90.28-40.42 90.28-90.28V256C507.42 118.83 398.82 0 256 0z">
						</path>
					</svg>
					<div class="font-semibold text-gray-300 uppercase title">Support</div>
				</div>
			</button>
		</div>
		<div class="flex justify-center honeycomb">
			<button class="relative hex focus:outline-none" onclick="this.blur();">
				<svg class="transform-gpu fill" viewBox="-2 0 177 200" height="150" width="124" version="1.1"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
						fill="currentColor"></path>
				</svg>
				<svg class="absolute top-0 transform-gpu stroke" viewBox="-2 0 177 200" height="150" width="124"
					version="1.1" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z">
					</path>
				</svg>
				<svg class="absolute top-0 transform-gpu thick-stroke" viewBox="-5 0 182 200" height="150" width="124"
					version="1.1" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z">
					</path>
				</svg>
			</button>
			<button class="relative hidden hex lg:block focus:outline-none" onclick="this.blur();">
				<svg class="transform-gpu fill" viewBox="-2 0 177 200" height="150" width="124" version="1.1"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
						fill="currentColor"></path>
				</svg>
				<svg class="absolute top-0 transform-gpu stroke" viewBox="-2 0 177 200" height="150" width="124"
					version="1.1" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z">
					</path>
				</svg>
				<svg class="absolute top-0 transform-gpu thick-stroke" viewBox="-5 0 182 200" height="150" width="124"
					version="1.1" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z">
					</path>
				</svg>
			</button>
			<button class="relative hidden hex lg:block focus:outline-none" onclick="this.blur();">
				<svg class="transform-gpu fill" viewBox="-2 0 177 200" height="150" width="124" version="1.1"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
						fill="currentColor"></path>
				</svg>
				<svg class="absolute top-0 transform-gpu stroke" viewBox="-2 0 177 200" height="150" width="124"
					version="1.1" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z">
					</path>
				</svg>
				<svg class="absolute top-0 transform-gpu thick-stroke" viewBox="-5 0 182 200" height="150" width="124"
					version="1.1" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z">
					</path>
				</svg>
			</button>
			<button class="relative hex focus:outline-none" onclick="this.blur();">
				<svg class="transform-gpu fill" viewBox="-2 0 177 200" height="150" width="124" version="1.1"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
						fill="currentColor"></path>
				</svg>
				<svg class="absolute top-0 transform-gpu stroke" viewBox="-2 0 177 200" height="150" width="124"
					version="1.1" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z">
					</path>
				</svg>
				<svg class="absolute top-0 transform-gpu thick-stroke" viewBox="-5 0 182 200" height="150" width="124"
					version="1.1" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z">
					</path>
				</svg>
			</button>
		</div>
	</section>
</nav>

<main id="main" class="flex flex-row-reverse justify-around w-full">
	<div class="flex flex-col w-11/12 m-10 mb-10 items-left lg:ml-0 sm:w-10/12 md:w-9/12 lg:w-8/12">
		<h2 class="inline-flex w-auto mb-6 text-xl font-bold text-left text-white">
			<a href="https://www.quillerbee.com/" class="focus:outline-none">Software Development (3)</a>
		</h2>
		<section
			class="relative flex flex-col pb-0 mb-6 transition-shadow duration-300 ease-in-out bg-gray-900 rounded-lg hover:shadow-lg">
			<div class="ribbon top-left"><span>popular</span></div>
			<div class="flex items-start justify-between mb-5">
				<div class="flex p-5">
					<div
						class="flex items-center justify-center inline-block text-4xl font-bold text-center text-gray-900 bg-pink-400 rounded-full w-logo h-logo">
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
									<svg class="mr-1 fill-current inline-inline-block" width="15" height="15"
										xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
										<path
											d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
									</svg>
									51 - 200
								</div>
							</div>
						</div>
						<div class="flex text-xs font-semibold text-green-800">
							<button onclick="this.blur();"
								class="px-2 py-1 mr-2 font-medium text-center bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 w-max rounded-2xl hover:shadow-lg focus:shadow-lg">
								Full Time
							</button>
							<button onclick="this.blur();"
								class="px-2 py-1 mr-2 font-medium text-center bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 w-max rounded-2xl hover:shadow-lg focus:shadow-lg">
								Remote
							</button>
						</div>
					</div>
				</div>
				<div class="flex pt-4 pr-5 text-gray-500">
					<button onclick="this.blur();"
						class="bookmark relative top-0 left-0 focus:outline-none p-1.5 mr-1 rounded-full transform-gpu">
						<div class="ribbon up" style="--color: #911750;">
							<div class="content">
							</div>
						</div>
					</button>

					<button onclick="this.blur();"
						class="focus:outline-none focus:ring-2 focus:ring-indigo-400 p-1.5 rounded-full hover:bg-indigo-200">
						<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
							fill="currentColor">
							<path fill-rule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clip-rule="evenodd" />
						</svg>
					</button>
				</div>
			</div>
			<div class="flex justify-between px-5 py-2 text-gray-500 border-t border-gray-800 border-solid">
				<div class="flex items-center justify-between w-full text-xs">
					<div class="flex">
						<div class="flex items-center mr-3">
							<svg class="mr-1 mb-0.5" width="15" height="15" xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd"
									d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
									clip-rule="evenodd" />
								<path
									d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
							</svg>
							3
						</div>
						<div class="flex items-center justify-center mr-2">
							<svg class="mr-0.5" width="15" height="15" xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd"
									d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z"
									clip-rule="evenodd" />
							</svg>
							<a class="focus:outline-none hover:text-gray-300 focus:text-gray-300"
								href="https://www.quillerbee.com/">
								JavaScript
							</a>
						</div>
						<div class="flex items-center justify-center mr-2">
							<svg class="mr-0.5" width="15" height="15" xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd"
									d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z"
									clip-rule="evenodd" />
							</svg>
							<a class="focus:outline-none hover:text-gray-300 focus:text-gray-300"
								href="https://www.quillerbee.com/">
								Svelte
							</a>
						</div>
					</div>
					<div class="flex items-center hidden mr-3 sm:block">
						<span class="text-gray-500">$</span>24k -
						<span class="ml-1 text-gray-500">$</span>40k
					</div>
				</div>
				<div class="flex">
					<button onclick="this.blur();"
						class="focus:outline-none focus:ring-2 focus:ring-purple-400 p-1.5 mr-1 rounded-full cursor-pointer hover:bg-purple-200">
						<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
							fill="currentColor">
							<path fill-rule="evenodd"
								d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
								clip-rule="evenodd" />
						</svg>
					</button>
					<button onclick="this.blur();"
						class="focus:outline-none focus:ring-2 focus:ring-red-400 p-1.5 rounded-full cursor-pointer hover:bg-red-200">
						<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
							fill="currentColor">
							<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
							<path fill-rule="evenodd"
								d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
								clip-rule="evenodd" />
						</svg>
					</button>
				</div>
			</div>
		</section>
		<section
			class="relative flex flex-col pb-0 mb-6 transition-shadow duration-300 ease-in-out bg-gray-900 rounded-lg hover:shadow-lg">
			<div class="flex items-start justify-between mb-5">
				<div class="flex p-5">
					<div class="bg-gray-700 rounded-full w-logo h-logo animate-pulse"></div>
					<div class="flex flex-col ml-4 text-left">
						<div>
							<div class="w-42 mb-0.5 h-5 mr-2 bg-gray-700 rounded animate-pulse"></div>
							<div>
								<div class="inline-block w-16 h-4 bg-gray-700 rounded animate-pulse"></div>
								<div class="inline-block w-20 h-4 bg-gray-700 rounded animate-pulse"></div>
							</div>
						</div>
						<div class="flex">
							<div class="w-20 mr-2 bg-gray-700 h-7 rounded-2xl animate-pulse"></div>
							<div class="w-20 mr-2 bg-gray-700 h-7 rounded-2xl animate-pulse"></div>
						</div>
					</div>
				</div>
				<div class="flex pt-4 pr-5">
					<div class="w-8 h-8 mr-1 bg-gray-700 rounded-full animate-pulse"></div>
					<div class="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
				</div>
			</div>
			<div class="flex justify-between px-5 py-2 border-t border-gray-800">
				<div class="flex items-center justify-between w-full text-xs">
					<div class="flex items-center">
						<div class="flex items-center w-8 h-8 mr-3 bg-gray-700 rounded-full animate-pulse"></div>
						<div class="flex items-center justify-center w-20 h-5 mr-2 bg-gray-700 rounded animate-pulse">
						</div>
						<div class="flex items-center justify-center w-20 h-5 mr-2 bg-gray-700 rounded animate-pulse">
						</div>
					</div>
					<div class="flex items-center hidden mr-3 sm:block">
						<div class="w-24 h-5 bg-gray-700 rounded animate-pulse"></div>
					</div>
				</div>
				<div class="flex">
					<div class="w-8 h-8 mr-1 bg-gray-700 rounded-full animate-pulse"></div>
					<div class="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
				</div>
			</div>
		</section>
		<section
			class="relative flex flex-col pb-0 mb-6 transition-shadow duration-300 ease-in-out bg-gray-900 rounded-lg hover:shadow-lg">
			<div class="flex justify-end px-5 py-2 text-gray-500 border-t border-gray-800 border-solid">
				<button onclick="this.blur();"
					class="focus:outline-none focus:ring-2 focus:ring-red-400 p-1.5 rounded-full cursor-pointer hover:bg-red-200">
					<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
						fill="currentColor">
						<path fill-rule="evenodd"
							d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
							clip-rule="evenodd" />
						<path
							d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
					</svg>
				</button>
			</div>
		</section>
		<section
			class="relative flex flex-col pb-0 mb-6 transition-shadow duration-300 ease-in-out rounded-lg bg-yellow-50 hover:shadow-lg">
			<div class="ribbon top-left"><span>featured</span></div>
			<div class="flex items-start justify-between mb-5">
				<div class="flex p-5">
					<div
						class="flex items-center justify-center inline-block text-4xl font-bold text-center text-white bg-pink-400 rounded-full w-logo h-logo">
						D
					</div>
					<div class="flex flex-col ml-4 text-left">
						<div class="mb-1">
							<div class="relative flex items-center">
								<div class="mr-2 truncate">
									Frontend Engineer
								</div>
							</div>
							<div class="flex items-center text-xs text-gray-600">
								Dgraph
								<div class="flex ml-2 text-gray-500">
									<svg class="mr-1 fill-current inline-inline-block" width="15" height="15"
										xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
										<path
											d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
									</svg>
									51 - 200
								</div>
							</div>
						</div>
						<div class="flex text-xs font-semibold text-green-800">
							<button onclick="this.blur();"
								class="px-2 py-1 mr-2 font-medium text-center bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 w-max rounded-2xl hover:shadow-lg focus:shadow-lg">
								Full Time
							</button>
							<button onclick="this.blur();"
								class="px-2 py-1 mr-2 font-medium text-center bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 w-max rounded-2xl hover:shadow-lg focus:shadow-lg">
								Remote
							</button>
						</div>
					</div>
				</div>
				<div class="flex pt-4 pr-5 text-gray-500">
					<button onclick="this.blur();"
						class="bookmark relative top-0 left-0 focus:outline-none p-1.5 mr-1 rounded-full transform-gpu">
						<div class="ribbon up" style="--color: #911750;">
							<div class="content">
							</div>
						</div>
					</button>
					<button onclick="this.blur();"
						class="focus:outline-none focus:ring-2 focus:ring-indigo-400 p-1.5 rounded-full hover:bg-indigo-200">
						<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
							fill="currentColor">
							<path fill-rule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clip-rule="evenodd" />
						</svg>
					</button>
				</div>
			</div>
			<div class="flex justify-between px-5 py-2 text-gray-500 border-t border-gray-200 border-solid">
				<div class="flex items-center justify-between w-full text-xs">
					<div class="flex">
						<div class="flex items-center mr-3">
							<svg class="mr-1 mb-0.5" width="15" height="15" xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd"
									d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
									clip-rule="evenodd" />
								<path
									d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
							</svg>
							3
						</div>
						<div class="flex items-center justify-center mr-2">
							<svg class="mr-0.5" width="15" height="15" xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd"
									d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z"
									clip-rule="evenodd" />
							</svg>
							<a class="focus:outline-none hover:text-gray-700 focus:text-gray-700"
								href="https://www.quillerbee.com/">
								JavaScript
							</a>
						</div>
						<div class="flex items-center justify-center mr-2">
							<svg class="mr-0.5" width="15" height="15" xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd"
									d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z"
									clip-rule="evenodd" />
							</svg>
							<a class="focus:outline-none hover:text-gray-700 focus:text-gray-700"
								href="https://www.quillerbee.com/">
								Svelte
							</a>
						</div>
					</div>
					<div class="flex items-center hidden mr-3 sm:block">
						<span class="text-gray-500">$</span>24k -
						<span class="ml-1 text-gray-500">$</span>40k
					</div>
				</div>
				<div class="flex">
					<button onclick="this.blur();"
						class="focus:outline-none focus:ring-2 focus:ring-purple-400 p-1.5 mr-1 rounded-full cursor-pointer hover:bg-purple-200">
						<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
							fill="currentColor">
							<path fill-rule="evenodd"
								d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
								clip-rule="evenodd" />
						</svg>
					</button>
					<button onclick="this.blur();"
						class="focus:outline-none focus:ring-2 focus:ring-red-400 p-1.5 rounded-full cursor-pointer hover:bg-red-200">
						<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
							fill="currentColor">
							<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
							<path fill-rule="evenodd"
								d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
								clip-rule="evenodd" />
						</svg>
					</button>
				</div>
			</div>
		</section>
		<h2 class="inline-flex w-auto my-6 text-xl font-bold text-left text-white">
			<a href="https://www.quillerbee.com/" class="focus:outline-none">Game Development (1)</a>
		</h2>
		<section
			class="relative flex flex-col pb-0 mb-6 transition-shadow duration-300 ease-in-out bg-gray-900 rounded-lg hover:shadow-lg">
			<div class="ribbon top-left"><span>urgent</span></div>
			<div class="flex items-start justify-between mb-5">
				<div class="flex p-5">
					<div
						class="flex items-center justify-center inline-block text-4xl font-bold text-center text-gray-900 bg-pink-400 rounded-full w-logo h-logo">
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
									<svg class="mr-1 fill-current inline-inline-block" width="15" height="15"
										xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
										<path
											d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
									</svg>
									51 - 200
								</div>
							</div>
						</div>
						<div class="flex text-xs font-semibold text-green-800">
							<button onclick="this.blur();"
								class="px-2 py-1 mr-2 font-medium text-center bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 w-max rounded-2xl hover:shadow-lg focus:shadow-lg">
								Full Time
							</button>
							<button onclick="this.blur();"
								class="px-2 py-1 mr-2 font-medium text-center bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 w-max rounded-2xl hover:shadow-lg focus:shadow-lg">
								Remote
							</button>
						</div>
					</div>
				</div>
				<div class="flex pt-4 pr-5 text-gray-500">
					<button onclick="this.blur();"
						class="bookmark relative top-0 left-0 focus:outline-none p-1.5 mr-1 rounded-full transform-gpu">
						<div class="ribbon up" style="--color: #911750;">
							<div class="content">
							</div>
						</div>
					</button>

					<button onclick="this.blur();"
						class="focus:outline-none focus:ring-2 focus:ring-indigo-400 p-1.5 rounded-full hover:bg-indigo-200">
						<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
							fill="currentColor">
							<path fill-rule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clip-rule="evenodd" />
						</svg>
					</button>
				</div>
			</div>
			<div class="flex justify-between px-5 py-2 text-gray-500 border-t border-gray-800 border-solid">
				<div class="flex items-center justify-between w-full text-xs">
					<div class="flex">
						<div class="flex items-center mr-3">
							<svg class="mr-1 mb-0.5" width="15" height="15" xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd"
									d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
									clip-rule="evenodd" />
								<path
									d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
							</svg>
							3
						</div>
						<div class="flex items-center justify-center mr-2">
							<svg class="mr-0.5" width="15" height="15" xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd"
									d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z"
									clip-rule="evenodd" />
							</svg>
							<a class="focus:outline-none hover:text-gray-300 focus:text-gray-300"
								href="https://www.quillerbee.com/">
								JavaScript
							</a>
						</div>
						<div class="flex items-center justify-center mr-2">
							<svg class="mr-0.5" width="15" height="15" xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd"
									d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z"
									clip-rule="evenodd" />
							</svg>
							<a class="focus:outline-none hover:text-gray-300 focus:text-gray-300"
								href="https://www.quillerbee.com/">
								Svelte
							</a>
						</div>
					</div>
					<div class="flex items-center hidden mr-3 sm:block">
						<span class="text-gray-500">$</span>24k -
						<span class="ml-1 text-gray-500">$</span>40k
					</div>
				</div>
				<div class="flex">
					<button onclick="this.blur();"
						class="focus:outline-none focus:ring-2 focus:ring-purple-400 p-1.5 mr-1 rounded-full cursor-pointer hover:bg-purple-200">
						<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
							fill="currentColor">
							<path fill-rule="evenodd"
								d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
								clip-rule="evenodd" />
						</svg>
					</button>
					<button onclick="this.blur();"
						class="focus:outline-none focus:ring-2 focus:ring-red-400 p-1.5 rounded-full cursor-pointer hover:bg-red-200">
						<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
							fill="currentColor">
							<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
							<path fill-rule="evenodd"
								d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
								clip-rule="evenodd" />
						</svg>
					</button>
				</div>
			</div>
		</section>
		<div id="load-more-container">
			<button class="load-more focus:outline-none focus:ring-2 focus:ring-green-400" onclick="this.blur();">
				<span class="bg-gray-900 circle transform-gpu" aria-hidden="true">
					<span class="icon arrow"></span>
				</span>
				<span class="flex items-center justify-center text-sm text-gray-500 button-text">Load More</span>
			</button>
		</div>
		<div class="flex justify-center">
			<div class="scale-75 loader transform-gpu">
				<div class="planet">
					<div class="ring"></div>
					<div class="cover-ring"></div>
					<div class="spots">
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
				<p>loading</p>
			</div>
		</div>
	</div>
	<aside class="relative hidden m-10 text-white lg:block lg:w-4/12 ribbon-container">
		<span class="ribbon left">
			Filters
		</span>
		<div class="w-full overflow-x-hidden overflow-y-auto bg-gray-900 rounded-lg shadow-lg rounded-2xl h-filter">

		</div>
		<div class="p-3">
			<a href="https://www.quillerbee.com/"
				class="inline-block mr-3 text-sm text-gray-300 hover:text-white focus:text-white focus:outline-none">Terms</a>
			<a href="https://www.quillerbee.com/"
				class="inline-block mr-3 text-sm text-gray-300 hover:text-white focus:text-white focus:outline-none">Privacy</a>
			<a href="https://www.quillerbee.com/"
				class="inline-block mr-3 text-sm text-gray-300 hover:text-white focus:text-white focus:outline-none">Cookies</a>
			<a href="https://www.quillerbee.com/"
				class="inline-block mr-3 text-sm text-gray-300 hover:text-white focus:text-white focus:outline-none">Disclaimer</a>
			<a href="https://www.quillerbee.com/"
				class="inline-block mr-3 text-sm text-gray-300 hover:text-white focus:text-white focus:outline-none">About</a>
			<br />
			<span class="inline-block text-sm text-gray-300">© 2021 Quiller
				Bee</span>
		</div>
	</aside>
</main>

<footer id="footer" class="w-full">
	<svg class="" viewBox="0 0 1439 147" version="1.1" xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink">
		<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
			<g transform="translate(-1.000000, -14.000000)" fill-rule="nonzero">
				<g class="wave" fill="#27273c">
					<path
						d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z">
					</path>
				</g>
				<g transform="translate(1.000000, 15.000000)" fill="#27273c">
					<g
						transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) ">
						<path
							d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
							opacity="0.100000001"></path>
						<path
							d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
							opacity="0.100000001"></path>
						<path
							d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
							opacity="0.200000003"></path>
					</g>
				</g>
			</g>
		</g>
	</svg>
	<section class="text-left text-white">
		<div class="container px-6 pt-4 mx-auto">
			<div class="lg:flex">
				<div class="w-full mb-10 mr-6 lg:w-2/5 lg:border-r lg:border-violet-300">
					<div>
						<div>
							<a href="https://www.quillerbee.com/"
								class="inline-block text-xl font-bold text-white focus:outline-none">Quiller
								Bee</a>
						</div>

						<p class="max-w-md pr-1 mt-2 text-gray-300">One stop destination for hand curated, high
							quality,
							jobs from world's most valuable companies!</p>
					</div>
				</div>

				<div class="mt-6 lg:mt-0 lg:flex-1">
					<div class="grid grid-cols-2 gap-6 sm:grid-cols-3">
						<div class="flex flex-col">
							<h3 class="font-semibold text-white uppercase">Company</h3>
							<div><a href="https://www.quillerbee.com/"
									class="inline-block mt-2 text-sm text-gray-300 focus:outline-none hover:text-white focus:text-white">About
									Us</a></div>
							<div><a href="https://www.quillerbee.com/"
									class="inline-block mt-2 text-sm text-gray-300 focus:outline-none hover:text-white focus:text-white">Analytics</a>
							</div>
							<div><a href="https://www.quillerbee.com/"
									class="inline-block mt-2 text-sm text-gray-300 focus:outline-none hover:text-white focus:text-white">Post
									a
									Job</a></div>
						</div>

						<div class="flex flex-col">
							<h3 class="font-semibold text-white uppercase">Legal</h3>

							<div><a href="https://www.quillerbee.com/"
									class="inline-block mt-2 text-sm text-gray-300 focus:outline-none hover:text-white focus:text-white">Privacy
									Policy</a></div>
							<div><a href="https://www.quillerbee.com/"
									class="inline-block mt-2 text-sm text-gray-300 focus:outline-none hover:text-white focus:text-white">Terms
									&
									Conditions</a></div>
							<div><a href="https://www.quillerbee.com/"
									class="inline-block mt-2 text-sm text-gray-300 focus:outline-none hover:text-white focus:text-white">Cookie
									Policy</a></div>
							<div><a href="https://www.quillerbee.com/"
									class="inline-block mt-2 text-sm text-gray-300 focus:outline-none hover:text-white focus:text-white">Disclaimer</a>
							</div>
						</div>

						<div>
							<h3 class="font-semibold text-white uppercase">Contact Us</h3>
							<a href="mailto:hello@quillerbee.com?subject=Hello Quiller Bees"
								class="inline-block mt-2 text-sm text-gray-300 focus:outline-none hover:text-white focus:text-white">
								hello@quillerbee.com
							</a>
						</div>
					</div>
				</div>
			</div>
			<hr class="h-px mt-6 bg-gray-600 border-none">
		</div>
		<div class="text-gray-400 body-font">
			<div class="container flex flex-col items-center px-5 py-8 mx-auto sm:flex-row">
				<div
					class="relative flex items-center justify-center font-medium text-white title-font md:justify-start">
					<svg viewBox="-2 0 177 200" class="absolute left-0 z-10 text-gray-900" height="50" width="50"
						version="1.1" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
							fill="#14141f"></path>
					</svg>
					<svg class="z-20 w-10 h-10 p-2 ml-1.5 rounded-full" xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="120 120 256 256">
						<defs>
							<path id="a"
								d="M271.34 350.42c-2.16-2.22-5.99-12.61-6.61-17.54-.61-4.93 1.92-9.23 5.3-9.51 2.25-.19 3.86 1.21 4.83 4.22-.91 16.69-2.08 24.3-3.52 22.83z" />
							<path id="b"
								d="M224.06 357.51c-2.76-3.69-7.34-21.3-7.92-29.72-.57-8.41 2.99-15.9 7.48-16.55 3-.44 5.07 1.9 6.21 7-2.01 28.63-3.93 41.72-5.77 39.27z" />
							<path id="c"
								d="M177.16 363.7c-2.89-3.86-7.69-22.29-8.29-31.1-.6-8.8 3.13-16.63 7.83-17.32 3.13-.45 5.3 1.99 6.49 7.32-2.1 29.97-4.11 43.67-6.03 41.1z" />
							<path id="d" d="M361.5 280l26.5-4.32-25-10.5" />
							<path id="e"
								d="M286.5 154.7c-5.67-31.24-28.59-39.95-37.59-40.54-8.99-.58-25.59 14.08-14.06 53.26 7.68 26.13 21.5 40.01 41.46 41.65 10.58-15.41 13.98-33.54 10.19-54.37z" />
							<path id="f"
								d="M252.5 340.18c82-1.5 109-45.5 110-68.18S354 185.68 248 184s-120.62 54.63-120 83.68c1.13 49.04 42.5 74 124.5 72.5z" />
							<path id="g"
								d="M324.5 201.68c-2.68-.84 9.87 13.38 13.46 28.39s3.05 18.55 3.54 29.61c.54 12.06.38 19.57-5.5 36.32-3.92 11.17-9.92 21.39-18 30.68L293 336c23-16.88 34.67-41.82 35-74.82s-11.17-57-34.5-72c17 5.83 27.33 10 31 12.5z" />
							<path id="h" d="M168 251a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
							<path id="i"
								d="M293.5 362.06c2.56-2.67 7.92-16.23 9.19-22.87 1.28-6.64-.83-12.94-4.34-13.9-2.34-.64-4.21 1.02-5.61 4.96-1.2 22.98-.94 33.58.76 31.81z" />
							<path id="j"
								d="M216.5 338.75c19.06.59 40.5 1.6 52.75 1.43C291 319.51 316 299.5 312 250.5s-44.87-63.21-50.75-66.5c-17.37-.79-36.29.78-55.45 3 10.64-.18 25 1.21 37.2 7.48 15 7.66 43 26.5 46 54.66 3 28.17-1.67 47.67-21 64.67s-30.06 24.1-51.5 24.94z" />
							<path id="k"
								d="M252 340c52-2.12 74.31-10.5 98.33-41.83-19.64 6.33-44.02 20.83-92 21.83-20.62.43-38.88 2.81-58.33 1.77-19.45-1.03-47.73-11.37-56-14.44 23.16 25.29 56 34.8 108 32.67z" />
							<path id="l"
								d="M320 182.18c26.5-17.5 25.5-42 22.5-50.5s-23-18-54.5 8c-21 17.33-28.33 35.5-22 54.5 18.33 3.66 36.33-.34 54-12z" />
							<path id="m"
								d="M328.43 346.9c2.56-2.67 8.72-17.83 9.99-24.47 1.28-6.64 2.29-8.47-1.22-9.43-2.34-.64-5.38 2.36-9.13 9-1.46 18.38-1.34 26.68.36 24.9z" />
							<path id="n"
								d="M240 368c3.33-3.48 10.33-21.19 12-29.86 1.67-8.66-1.08-16.89-5.67-18.14-3.05-.83-5.5 1.33-7.33 6.48-1.56 30-1.22 43.84 1 41.52z" />
							<path id="o" d="M233.5 251.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
						</defs>
						<use fill="#2e2514" xlink:href="#a" />
						<use fill="none" stroke="#161008" stroke-width="4" xlink:href="#a" />
						<path fill="#161008"
							d="M187.64 282.8c0 1-.85 1.81-1.9 1.81s-1.91-.81-1.91-1.81c0-.99.86-1.8 1.91-1.8s1.9.81 1.9 1.8z" />
						<use fill="#2e2514" xlink:href="#b" />
						<use fill="none" stroke="#161008" stroke-width="4" xlink:href="#b" />
						<path fill="#161008"
							d="M211.12 283.37c0 1.04-.89 1.88-1.98 1.88s-1.97-.84-1.97-1.88c0-1.03.88-1.87 1.97-1.87s1.98.84 1.98 1.87z" />
						<path fill="#161008" fill-opacity=".13"
							d="M356.44 372.25c0 13.66-45.8 24.75-102.22 24.75S152 385.91 152 372.25s45.8-24.75 102.22-24.75 102.22 11.09 102.22 24.75z" />
						<use fill="#2e2514" xlink:href="#c" />
						<use fill="none" stroke="#161008" stroke-width="4" xlink:href="#c" />
						<use fill="#2e2514" xlink:href="#d" />
						<use fill="none" stroke="#161008" stroke-width="4" xlink:href="#d" />
						<use fill="#bbe0e5" opacity=".5" xlink:href="#e" />
						<use fill="none" stroke="#adc9ca" stroke-width="2" opacity=".5" xlink:href="#e" />
						<use fill="#ffe74f" xlink:href="#f" />
						<use fill="none" stroke="#161008" stroke-width="4" xlink:href="#f" />
						<use fill="#2a1a12" xlink:href="#g" />
						<use fill="none" stroke="#161008" stroke-width="3" xlink:href="#g" />
						<use xlink:href="#h" />
						<use fill="none" xlink:href="#h" />
						<use fill="#2e2514" xlink:href="#i" />
						<use fill="none" stroke="#161008" stroke-width="4" xlink:href="#i" />
						<path fill="none" stroke="#161008" stroke-width="4"
							d="M209.5 283.18c-11.5 7.37-19 4.62-24-.5" />
						<use fill="#2a1a12" xlink:href="#j" />
						<use fill="none" stroke="#161008" stroke-width="4" xlink:href="#j" />
						<use fill-opacity=".23" xlink:href="#k" />
						<use fill="none" xlink:href="#k" />
						<use fill="#bbe0e5" opacity=".5" xlink:href="#l" />
						<use fill="none" stroke="#adc9ca" stroke-width="2" opacity=".5" xlink:href="#l" />
						<use fill="#2e2414" xlink:href="#m" />
						<use fill="none" stroke="#161008" stroke-width="4" xlink:href="#m" />
						<use fill="#2e2514" xlink:href="#n" />
						<use fill="none" stroke="#161008" stroke-width="4" xlink:href="#n" />
						<use xlink:href="#o" />
						<use fill="none" xlink:href="#o" />
					</svg>
					<span class="ml-3 -mt-1 text-xl">Quiller Bee</span>
				</div>
				<p class="mt-4 text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-600 sm:py-2 sm:mt-0">
					© 2021 Quiller Bee
					<br />
					<a href="https://twitter.com/quillerbee"
						class="inline-block text-gray-500 focus:outline-none hover:text-white focus:text-white"
						target="_blank" rel="noopener noreferrer">@quillerbee</a>
				</p>
				<span class="inline-flex justify-center mt-4 cursor-pointer sm:ml-auto sm:mt-0 sm:justify-start">
					<a href="https://www.quillerbee.com/"
						class="text-gray-400 hover:text-white focus:text-white focus:outline-none">
						<svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							class="w-5 h-5" viewBox="0 0 24 24">
							<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
						</svg>
					</a>
					<a href="https://www.quillerbee.com/"
						class="ml-3 text-gray-400 hover:text-white focus:text-white focus:outline-none">
						<svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							class="w-5 h-5" viewBox="0 0 24 24">
							<path
								d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z">
							</path>
						</svg>
					</a>
					<a href="https://www.quillerbee.com/"
						class="ml-3 text-gray-400 hover:text-white focus:text-white focus:outline-none">
						<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
							stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
							<rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
							<path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
						</svg>
					</a>
					<a href="https://www.quillerbee.com/"
						class="ml-3 text-gray-400 hover:text-white focus:text-white focus:outline-none">
						<svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
							stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
							<path stroke="none"
								d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z">
							</path>
							<circle cx="4" cy="4" r="2" stroke="none"></circle>
						</svg>
					</a>
				</span>
			</div>
		</div>
	</section>
</footer>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>