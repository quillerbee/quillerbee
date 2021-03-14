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

<section class="absolute top-0 flex flex-col justify-around w-full p-10 pointer-events-none h-4/5">
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