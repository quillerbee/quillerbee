<script>
    import Hex from './Hex.svelte';
</script>

<nav>
    <section class="mb-10 text-gray-900 beehive">
        <div class="flex justify-center honeycomb">
            <button class="relative hex focus:outline-none" onclick="this.blur();">
                <Hex />
                <div class="absolute top-0 flex flex-col items-center w-full h-full pt-10 text-xs transform-gpu">
                    <svg class="mb-3 text-gray-400 icon" width="35" height="35">
                        <use xlink:href="symbol-defs.svg#rocket" />
                    </svg>
                    <div class="font-semibold text-gray-300 uppercase title">Startups</div>
                </div>
            </button>
            <button class="relative hidden lg:block hex focus:outline-none" onclick="this.blur();">
                <Hex />
                <div class="absolute top-0 flex flex-col items-center w-full h-full pt-10 text-xs transform-gpu">
                    <svg class="mb-3 text-gray-400 icon" width="90" height="35">
                        <use xlink:href="symbol-defs.svg#gamepad" />
                    </svg>
                    <div class="font-semibold text-gray-300 uppercase title">Game Dev</div>
                </div>
            </button>
            <button class="relative hex focus:outline-none" onclick="this.blur();">
                <Hex />
                <div class="absolute top-0 flex flex-col items-center w-full h-full pt-10 text-xs transform-gpu">
                    <svg class="mb-3 text-gray-400 icon" width="35" height="35">
                        <use xlink:href="symbol-defs.svg#laptop-house" />
                    </svg>
                    <div class="font-semibold text-gray-300 uppercase title">Remote</div>
                </div>
            </button>
            <button class="relative hidden lg:block hex focus:outline-none" onclick="this.blur();">
                <Hex />
                <div class="absolute top-0 flex flex-col items-center w-full h-full pt-10 text-xs transform-gpu">
                    <svg class="mb-3 text-gray-400 icon" width="35" height="35">
                        <use xlink:href="symbol-defs.svg#paint-brush" />
                    </svg>
                    <div class="font-semibold text-gray-300 uppercase title">Design</div>
                </div>
            </button>
            <button class="relative focus:outline-none hex" onclick="this.blur();">
                <Hex />
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
                <Hex />
            </button>
            <button class="relative hidden hex lg:block focus:outline-none" onclick="this.blur();">
                <Hex />
            </button>
            <button class="relative hidden hex lg:block focus:outline-none" onclick="this.blur();">
                <Hex />
            </button>
            <button class="relative hex focus:outline-none" onclick="this.blur();">
                <Hex />
            </button>
        </div>
    </section>
</nav>