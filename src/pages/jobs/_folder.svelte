<script>
    import { onMount } from "svelte";
    import { url } from "@roxi/routify";
    import Typewriter from "typewriter-effect/dist/core";

    let header;

    onMount(() => {
        let typewriter = new Typewriter(header, {
            loop: true,
            delay: 75
        });

        typewriter
            .pauseFor(1000)
            .typeString("Looking for Jobs")
            .pauseFor(300)
            .deleteChars(4)
            .typeString("Remote Jobs")
            .pauseFor(1000)
            .deleteChars(11)
            .typeString("Indie Gigs")
            .pauseFor(1000)
            .deleteChars(10)
            .typeString("Fulltime Opportunities")
            .pauseFor(1000)
            .changeDeleteSpeed(1)
            .deleteChars(30)
            .typeString(" no further")
            .pauseFor(1000)
            .deleteAll()
            .typeString(
                'We have <span style="color: #A2CD48;">handpicked</span> them for you!'
            )
            .pauseFor(1000)
            .changeDeleteSpeed(1)
            .deleteAll()
            .typeString(
                'Welcome to <strong style="color: yellow;">Quiller Bee</strong>'
            )
            .pauseFor(1000)
            .start();
    });
</script>

<section class="absolute top-0 flex flex-col justify-around w-full p-10 pointer-events-none h-2/3">
    <div class="relative max-w-3xl px-6 mx-auto">
        <div class="absolute top-0 left-0 flex items-center h-10 pl-10 mt-1">
            <svg class="w-4 h-4 text-gray-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8
            14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
            </svg>
        </div>
        <input id="search-toggle" type="search" placeholder="Enter search term ('/' to focus)"
            class="inline-block w-full py-3 pl-12 pr-4 mb-1 font-bold text-gray-700 bg-gray-100 rounded-lg pointer-events-auto focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-20" />
        <label for="search-toggle" class="absolute text-xs italic font-semibold text-white -bottom-4 right-8">
            Powered by Dgraph
        </label>
    </div>
    <h1 bind:this={header} id="typewriter"
        class="text-lg font-bold text-white pointer-events-none sm:text-2xl md:text-4xl bottom-36">&nbsp;</h1>
</section>

<nav>
    <section class="mb-10 text-gray-900 beehive">
        <div class="flex justify-center honeycomb">
            <button class="relative hex focus:outline-none" onclick="this.blur();">
                <svg class="transition-all duration-200 fill transform-gpu" height="150" width="124">
                    <use xlink:href="symbol-defs.svg#hex" />
                </svg>
                <svg class="absolute top-0 transform-gpu stroke" height="150" width="124">
                    <use xlink:href="symbol-defs.svg#hex" />
                </svg>
                <svg class="absolute top-0 transform-gpu thick-stroke" height="150" width="124">
                    <use xlink:href="symbol-defs.svg#hex-ring" />
                </svg>
                <div class="absolute top-0 flex flex-col items-center w-full h-full pt-10 text-xs transform-gpu">
                    <svg class="mb-3 text-gray-400 icon" width="35" height="35">
                        <use xlink:href="symbol-defs.svg#rocket" />
                    </svg>
                    <div class="font-semibold text-gray-300 uppercase title">Startups</div>
                </div>
            </button>
            <button class="relative hidden lg:block hex focus:outline-none" onclick="this.blur();">
                <svg class="transition-all duration-200 fill transform-gpu" height="150" width="124">
                    <use xlink:href="symbol-defs.svg#hex" />
                </svg>
                <svg class="absolute top-0 transform-gpu stroke" height="150" width="124">
                    <use xlink:href="symbol-defs.svg#hex" />
                </svg>
                <svg class="absolute top-0 transform-gpu thick-stroke" height="150" width="124">
                    <use xlink:href="symbol-defs.svg#hex-ring" />
                </svg>
                <div class="absolute top-0 flex flex-col items-center w-full h-full pt-10 text-xs transform-gpu">
                    <svg class="mb-3 text-gray-400 icon" width="90" height="35">
                        <use xlink:href="symbol-defs.svg#gamepad" />
                    </svg>
                    <div class="font-semibold text-gray-300 uppercase title">Game Dev</div>
                </div>
            </button>
            <button class="relative hex focus:outline-none" onclick="this.blur();">
                <svg class="transition-all duration-200 fill transform-gpu" height="150" width="124">
                    <use xlink:href="symbol-defs.svg#hex" />
                </svg>
                <svg class="absolute top-0 transform-gpu stroke" height="150" width="124">
                    <use xlink:href="symbol-defs.svg#hex" />
                </svg>
                <svg class="absolute top-0 transform-gpu thick-stroke" height="150" width="124">
                    <use xlink:href="symbol-defs.svg#hex-ring" />
                </svg>
                <div class="absolute top-0 flex flex-col items-center w-full h-full pt-10 text-xs transform-gpu">
                    <svg class="mb-3 text-gray-400 icon" width="35" height="35">
                        <use xlink:href="symbol-defs.svg#laptop-house" />
                    </svg>
                    <div class="font-semibold text-gray-300 uppercase title">Remote</div>
                </div>
            </button>
            <button class="relative hidden lg:block hex focus:outline-none" onclick="this.blur();">
                <svg class="transition-all duration-200 fill transform-gpu" height="150" width="124">
                    <use xlink:href="symbol-defs.svg#hex" />
                </svg>
                <svg class="absolute top-0 transform-gpu stroke" height="150" width="124">
                    <use xlink:href="symbol-defs.svg#hex" />
                </svg>
                <svg class="absolute top-0 transform-gpu thick-stroke" height="150" width="124">
                    <use xlink:href="symbol-defs.svg#hex-ring" />
                </svg>
                <div class="absolute top-0 flex flex-col items-center w-full h-full pt-10 text-xs transform-gpu">
                    <svg class="mb-3 text-gray-400 icon" width="35" height="35">
                        <use xlink:href="symbol-defs.svg#paint-brush" />
                    </svg>
                    <div class="font-semibold text-gray-300 uppercase title">Design</div>
                </div>
            </button>
            <button class="relative focus:outline-none hex" onclick="this.blur();">
                <svg class="transition-all duration-200 fill transform-gpu" height="150" width="124">
                    <use xlink:href="symbol-defs.svg#hex" />
                </svg>
                <svg class="absolute top-0 transform-gpu stroke" height="150" width="124">
                    <use xlink:href="symbol-defs.svg#hex" />
                </svg>
                <svg class="absolute top-0 transform-gpu thick-stroke" height="150" width="124">
                    <use xlink:href="symbol-defs.svg#hex-ring" />
                </svg>
                <div class="absolute top-0 flex flex-col items-center w-full h-full pt-10 text-xs transform-gpu">
                    <svg class="mb-3 text-gray-400 icon" width="35" height="35">
                        <use xlink:href="symbol-defs.svg#headset" />
                    </svg>
                    <div class="font-semibold text-gray-300 uppercase title">Support</div>
                </div>
            </button>
        </div>
        <div class="flex justify-center honeycomb">
            <button class="relative hex focus:outline-none" onclick="this.blur();">
                <svg class="transition-all duration-200 fill transform-gpu" height="150" width="124">
                    <use xlink:href="symbol-defs.svg#hex" />
                </svg>
                <svg class="absolute top-0 transform-gpu stroke" height="150" width="124">
                    <use xlink:href="symbol-defs.svg#hex" />
                </svg>
                <svg class="absolute top-0 transform-gpu thick-stroke" height="150" width="124">
                    <use xlink:href="symbol-defs.svg#hex-ring" />
                </svg>
            </button>
            <button class="relative hidden hex lg:block focus:outline-none" onclick="this.blur();">
                <svg class="transition-all duration-200 fill transform-gpu" height="150" width="124">
                    <use xlink:href="symbol-defs.svg#hex" />
                </svg>
                <svg class="absolute top-0 transform-gpu stroke" height="150" width="124">
                    <use xlink:href="symbol-defs.svg#hex" />
                </svg>
                <svg class="absolute top-0 transform-gpu thick-stroke" height="150" width="124">
                    <use xlink:href="symbol-defs.svg#hex-ring" />
                </svg>
            </button>
            <button class="relative hidden hex lg:block focus:outline-none" onclick="this.blur();">
                <svg class="transition-all duration-200 fill transform-gpu" height="150" width="124">
                    <use xlink:href="symbol-defs.svg#hex" />
                </svg>
                <svg class="absolute top-0 transform-gpu stroke" height="150" width="124">
                    <use xlink:href="symbol-defs.svg#hex" />
                </svg>
                <svg class="absolute top-0 transform-gpu thick-stroke" height="150" width="124">
                    <use xlink:href="symbol-defs.svg#hex-ring" />
                </svg>
            </button>
            <button class="relative hex focus:outline-none" onclick="this.blur();">
                <svg class="transition-all duration-200 fill transform-gpu" height="150" width="124">
                    <use xlink:href="symbol-defs.svg#hex" />
                </svg>
                <svg class="absolute top-0 transform-gpu stroke" height="150" width="124">
                    <use xlink:href="symbol-defs.svg#hex" />
                </svg>
                <svg class="absolute top-0 transform-gpu thick-stroke" height="150" width="124">
                    <use xlink:href="symbol-defs.svg#hex-ring" />
                </svg>
            </button>
        </div>
    </section>
</nav>

<main id="main" class="flex flex-row-reverse justify-around w-full">
    <slot />
    <aside class="relative hidden m-10 text-white lg:block lg:w-4/12 ribbon-container">
        <span class="ribbon left">
            Filters
        </span>
        <div class="w-full overflow-x-hidden overflow-y-auto bg-gray-900 shadow-lg rounded-2xl h-filter">

        </div>
        <div class="p-3">
            <a use:$url href="/legal/privacy-policy"
                class="inline-block mr-3 text-sm text-gray-300 hover:text-white focus:text-white focus:outline-none">Terms</a>
            <a use:$url href="/legal/terms-and-conditions"
                class="inline-block mr-3 text-sm text-gray-300 hover:text-white focus:text-white focus:outline-none">Privacy</a>
            <a use:$url href="/legal/cookie-policy"
                class="inline-block mr-3 text-sm text-gray-300 hover:text-white focus:text-white focus:outline-none">Cookies</a>
            <a use:$url href="/legal/disclaimer"
                class="inline-block mr-3 text-sm text-gray-300 hover:text-white focus:text-white focus:outline-none">Disclaimer</a>
            <a use:$url href="/about"
                class="inline-block mr-3 text-sm text-gray-300 hover:text-white focus:text-white focus:outline-none">About</a>
            <br />
            <span class="inline-block text-sm text-gray-300">© 2021 Quiller
                Bee</span>
        </div>
    </aside>
</main>