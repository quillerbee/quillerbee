<script>
    export let classes = "";
    export let title = "";
    export let icon = "";
</script>

<style>
    /* https://codepen.io/uiswarup/pen/dyyqaGR */

    .hex {
        margin: 0 7.5px;
    }

    .hex .stroke,
    .hex .thick-stroke {
        fill: none;
        color: transparent;
        z-index: 1;
        stroke: #111827;
        pointer-events: none;
    }

    .hex svg,
    .hex .title {
        -webkit-transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
        -moz-transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
        -o-transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
        transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
    }

    .hex .stroke {
        stroke-width: 5px;
        transform: scale(1.15);
    }

    .hex .thick-stroke {
        stroke-width: 0px;
        transform: scale(1);
    }

    .hex:hover .fill,
    .hex:focus .fill {
        transform: scale(1.15);
    }

    .hex:hover .stroke,
    .hex:focus .stroke {
        stroke-width: 2.5px;
    }

    .hex:hover .thick-stroke,
    .hex:focus .thick-stroke {
        stroke-width: 7px;
        transform: scale(1.4);
    }

    .hex:hover .stroke,
    .hex:focus .stroke,
    .hex:hover .thick-stroke,
    .hex:focus .thick-stroke {
        z-index: 2;
        stroke: yellow;
    }

    .hex:hover .icon,
    .hex:focus .icon,
    .hex:hover .title,
    .hex:focus .title {
        color: yellow;
    }

    .hex:hover .title,
    .hex:focus .title {
        -webkit-animation: focus-in-contract 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        animation: focus-in-contract 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }

    @-webkit-keyframes focus-in-contract {
        0% {
            letter-spacing: 1em;
            -webkit-filter: blur(12px);
            filter: blur(12px);
            opacity: 0;
        }

        100% {
            -webkit-filter: blur(0px);
            filter: blur(0px);
            opacity: 1;
        }
    }

    @keyframes focus-in-contract {
        0% {
            letter-spacing: 1em;
            -webkit-filter: blur(12px);
            filter: blur(12px);
            opacity: 0;
        }

        100% {
            -webkit-filter: blur(0px);
            filter: blur(0px);
            opacity: 1;
        }
    }
</style>

<button class={classes} onclick="this.blur();">
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
            <use xlink:href={`symbol-defs.svg#${icon}`} />
        </svg>
        <div class="font-semibold text-gray-300 uppercase title">{title}</div>
    </div>
</button>