<script>
  import { onMount } from "svelte";
  import { url, goto, isChangingPage, metatags } from "@roxi/routify";
  import { Loader, DayAndNightToggle } from "components";

  metatags.title = `Quiller Bee`;
  metatags.description = `One stop destination for hand curated, high quality, jobs from world's most valuable companies!`;

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

  let pointerX, pointerY;

  let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };

  let touchInput = false;

  onMount(() => {
    context = canvas.getContext("2d");
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
    let direction = "z";

    let vx = Math.abs(velocity.x),
      vy = Math.abs(velocity.y);

    if (vx > 1 || vy > 1) {
      let axis;

      if (vx > vy) {
        axis = Math.random() < vx / (vx + vy) ? "h" : "v";
      } else {
        axis = Math.random() < vy / (vx + vy) ? "v" : "h";
      }

      if (axis === "h") {
        direction = velocity.x > 0 ? "l" : "r";
      } else {
        direction = velocity.y > 0 ? "t" : "b";
      }
    }

    star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

    if (direction === "z") {
      star.z = 0.1;
      star.x = Math.random() * width;
      star.y = Math.random() * height;
    } else if (direction === "l") {
      star.x = -OVERFLOW_THRESHOLD;
      star.y = height * Math.random();
    } else if (direction === "r") {
      star.x = width + OVERFLOW_THRESHOLD;
      star.y = height * Math.random();
    } else if (direction === "t") {
      star.x = width * Math.random();
      star.y = -OVERFLOW_THRESHOLD;
    } else if (direction === "b") {
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

    stars.forEach(star => {
      star.x += velocity.x * star.z;
      star.y += velocity.y * star.z;

      star.x += (star.x - width / 2) * velocity.z * star.z;
      star.y += (star.y - height / 2) * velocity.z * star.z;
      star.z += velocity.z;

      // recycle when out of bounds
      if (
        star.x < -OVERFLOW_THRESHOLD ||
        star.x > width + OVERFLOW_THRESHOLD ||
        star.y < -OVERFLOW_THRESHOLD ||
        star.y > height + OVERFLOW_THRESHOLD
      ) {
        recycleStar(star);
      }
    });
  }

  function render() {
    stars.forEach(star => {
      context.beginPath();
      context.lineCap = "round";
      context.lineWidth = STAR_SIZE * star.z * scale;
      context.strokeStyle =
        "rgba(255,255,255," + (0.5 + 0.5 * Math.random()) + ")";

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
    if (typeof pointerX === "number" && typeof pointerY === "number") {
      let ox = x - pointerX,
        oy = y - pointerY;

      velocity.tx = velocity.tx + (ox / 8) * scale * (touchInput ? 1 : -1);
      velocity.ty = velocity.ty + (oy / 8) * scale * (touchInput ? 1 : -1);
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

<style>
  .logo-link {
    height: 64px;
  }

  .logo {
    left: 5px;
    top: 7px;
  }

  .text-dark-gray {
    color: #14141f;
  }
</style>

<header class="relative w-full mb-16">
  <nav class="fixed z-10 flex items-center justify-between w-full h-16 p-5 pointer-events-none frosted-glass">
    <div class="skip-link">
      <div class="mb-2">Skip to</div>
      <a href="#main" class="focus:outline-none">Content</a>
      or
      <a href="#footer" class="focus:outline-none">Footer</a>
      <div class="ribbon banner transform-gpu" />
    </div>
    <a use:$url href="/jobs" class="flex items-center outline-none pointer-events-auto logo-link">
      <svg class="absolute z-10 text-dark-gray" height="50" width="50">
        <use xlink:href="symbol-defs.svg#hex" />
      </svg>
      <svg class="ml-1.5 z-20 w-10 h-10 p-2 rounded-full logo">
        <use xlink:href="symbol-defs.svg#logo" />
      </svg>
    </a>
    <div class="flex items-center">
      <DayAndNightToggle />
      <button on:click="{(e)=> {$goto('/admin'); e?.target?.blur();}}"
        class="outline-none buttons btn-hover color-3 focus:outline-none focus:ring-2 focus:ring-purple-500">
        Post a Job
      </button>
    </div>
  </nav>
  <canvas class="w-full h-full" bind:this={canvas} />
  <svg class="absolute bottom-0 text-gray-800 pointer-events-none" viewBox="0 0 1428 174" version="1.1"
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g transform="translate(-2.000000, 44.000000)" fill="currentColor" fill-rule="nonzero">
        <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927
          291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785
          759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001" />
        <path d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657
          546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068
          979,55.0741668 C931.069965,56.122511 810.303266,74.8455141
          616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612
          100,104.708498 Z" opacity="0.100000001" />
        <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883
          1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071
          1046,51.6521276 Z" id="Path-4" opacity="0.200000003" />
      </g>
      <g transform="translate(-4.000000, 76.000000)" fill="currentColor" fill-rule="nonzero">
        <path d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865
          C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759
          396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372
          556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991
          C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317
          818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522
          1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387
          C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748
          1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031
          L0.457,34.035 Z" />
      </g>
    </g>
  </svg>
</header>

<slot />

{#if $isChangingPage}
<Loader />
{/if}

<footer id="footer" class="w-full">
  <svg class="text-gray-800" viewBox="0 0 1439 147" version="1.1" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g transform="translate(-1.000000, -14.000000)" fill-rule="nonzero">
        <g class="wave" fill="currentColor">
          <path d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824
            1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22
            C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121
            804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309
            621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108
            C379.49,106.484 342.823,104.484 319,102 C278.571,97.783
            231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0
            L1440,0 L1440,84 Z" />
        </g>
        <g transform="translate(1.000000, 15.000000)" fill="currentColor">
          <g transform="translate(719.500000, 68.500000) rotate(-180.000000)
            translate(-719.500000, -68.500000) ">
            <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927
              291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785
              759,82.7326078 C469.336065,156.254352 216.336065,153.6679
              0,74.9732496" opacity="0.100000001" />
            <path d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657
              546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068
              979,55.0741668 C931.069965,56.122511 810.303266,74.8455141
              616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612
              100,104.708498 Z" opacity="0.100000001" />
            <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883
              1439,40.1656806 L1439,120 C1271.17211,77.9435312
              1140.17211,55.1609071 1046,51.6521276 Z" opacity="0.200000003" />
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
              <a use:$url href="/jobs" class="inline-block text-xl font-bold text-white focus:outline-none">
                Quiller Bee
              </a>
            </div>

            <p class="max-w-md pr-1 mt-2 text-gray-300">
              One stop destination for hand curated, high quality, jobs from
              world's most valuable companies!
            </p>
          </div>
        </div>

        <div class="mt-6 lg:mt-0 lg:flex-1">
          <div class="grid grid-cols-2 gap-6 sm:grid-cols-3">
            <div class="flex flex-col">
              <h3 class="font-semibold text-white uppercase">Company</h3>
              <div>
                <a use:$url href="/about"
                  class="inline-block mt-2 text-sm text-gray-300 focus:outline-none hover:text-white focus:text-white">
                  About Us
                </a>
              </div>
              <div>
                <a href="https://plausible.io/quillerbee.com"
                  class="inline-block mt-2 text-sm text-gray-300 focus:outline-none hover:text-white focus:text-white">
                  Analytics
                </a>
              </div>
              <div>
                <a use:$url href="/admin"
                  class="inline-block mt-2 text-sm text-gray-300 focus:outline-none hover:text-white focus:text-white">
                  Post a Job
                </a>
              </div>
            </div>

            <div class="flex flex-col">
              <h3 class="font-semibold text-white uppercase">Legal</h3>

              <div>
                <a use:$url href="/legal/privacy-policy"
                  class="inline-block mt-2 text-sm text-gray-300 focus:outline-none hover:text-white focus:text-white">
                  Privacy Policy
                </a>
              </div>
              <div>
                <a use:$url href="/legal/terms-and-conditions"
                  class="inline-block mt-2 text-sm text-gray-300 focus:outline-none hover:text-white focus:text-white">
                  Terms & Conditions
                </a>
              </div>
              <div>
                <a use:$url href="/legal/cookie-policy"
                  class="inline-block mt-2 text-sm text-gray-300 focus:outline-none hover:text-white focus:text-white">
                  Cookie Policy
                </a>
              </div>
              <div>
                <a use:$url href="/legal/disclaimer"
                  class="inline-block mt-2 text-sm text-gray-300 focus:outline-none hover:text-white focus:text-white">
                  Disclaimer
                </a>
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
      <hr class="h-px mt-6 bg-gray-600 border-none" />
    </div>
    <div class="text-gray-400 body-font">
      <div class="container flex flex-col items-center px-5 py-8 mx-auto sm:flex-row">
        <div class="relative flex items-center justify-center font-medium text-white title-font md:justify-start">
          <a use:$url href="/jobs" class="flex items-center outline-none pointer-events-auto logo-link">
            <svg class="absolute z-10 text-dark-gray" height="50" width="50">
              <use xlink:href="symbol-defs.svg#hex" />
            </svg>
            <svg class="ml-1.5 z-20 w-10 h-10 p-2 rounded-full logo">
              <use xlink:href="symbol-defs.svg#logo" />
            </svg>
            <span class="ml-3 -mt-1 text-xl">Quiller Bee</span>
          </a>
        </div>
        <p class="mt-4 text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-600 sm:py-2 sm:mt-0">
          © 2021 Quiller Bee
          <br />
          <a href="https://twitter.com/quillerbee"
            class="inline-block text-gray-500 focus:outline-none hover:text-white focus:text-white" target="_blank"
            rel="noopener noreferrer">
            @quillerbee
          </a>
        </p>
        <span class="inline-flex justify-center mt-4 cursor-pointer sm:ml-auto sm:mt-0 sm:justify-start">
          <a href="https://www.quillerbee.com/"
            class="text-gray-400 hover:text-white focus:text-white focus:outline-none">
            <svg class="w-5 h-5">
              <use xlink:href="symbol-defs.svg#facebook" />
            </svg>
          </a>
          <a href="https://www.quillerbee.com/"
            class="ml-3 text-gray-400 hover:text-white focus:text-white focus:outline-none">
            <svg class="w-5 h-5">
              <use xlink:href="symbol-defs.svg#twitter" />
            </svg>
          </a>
          <a href="https://www.quillerbee.com/"
            class="ml-3 text-gray-400 hover:text-white focus:text-white focus:outline-none">
            <svg class="w-5 h-5">
              <use xlink:href="symbol-defs.svg#instagram" />
            </svg>
          </a>
          <a href="https://www.quillerbee.com/"
            class="ml-3 text-gray-400 hover:text-white focus:text-white focus:outline-none">
            <svg class="w-5 h-5">
              <use xlink:href="symbol-defs.svg#linkedin" />
            </svg>
          </a>
        </span>
      </div>
    </div>
  </section>
</footer>