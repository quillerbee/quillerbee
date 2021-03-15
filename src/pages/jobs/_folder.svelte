<script>
    import { onMount } from "svelte";
    import Typewriter from "typewriter-effect/dist/core";
    import { Honeycomb, Filter } from "components";

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
            <svg class="w-4 h-4 text-gray-600 fill-current">
                <use xlink:href="#search" />
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

<Honeycomb />

<main id="main" class="flex flex-row-reverse justify-around w-full">
    <slot />
    <Filter />
</main>