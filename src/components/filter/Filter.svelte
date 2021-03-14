<script>
    import { url } from "@roxi/routify";
</script>

<style>
    /* https://codepen.io/simoncoudeville/pen/LyCda */

    .ribbon.left {
        position: absolute;
        top: -5px;
        left: -5px;
        display: inline-block;
        padding: 0 0.75em;
        border-radius: 5px 2px 2px 0;
        text-transform: uppercase;
        letter-spacing: .1em;
        font-size: 12px;
        font-size: 0.75rem;
        line-height: 2.35em;
        font-weight: bold;
        color: #6b4e00;
        background-color: #ffc938;
        z-index: 1;
        -moz-border-radius: 5px 2px 2px 0;
        -webkit-border-radius: 5px;
        border-radius: 5px 2px 2px 0;
        -moz-box-shadow: 0px 2px 0 rgba(31, 41, 51, 0.1);
        -webkit-box-shadow: 0px 2px 0 rgb(31 41 51 / 10%);
        box-shadow: 0px 2px 0 rgb(31 41 51 / 10%);
        -moz-transition: all 0.1s;
        -o-transition: all 0.1s;
        -webkit-transition: all 0.1s;
        transition: all 0.1s;
    }

    .ribbon.left::before {
        content: " ";
        display: block;
        position: absolute;
        width: 5px;
        height: 4px;
        left: 0;
        bottom: -4px;
        background-color: #ffc938;
    }

    .ribbon.left::after {
        content: " ";
        display: block;
        position: absolute;
        width: 5px;
        height: 6px;
        bottom: -6px;
        left: 0;
        background-color: #9e7300;
        -moz-border-radius: 5px 0 0 5px;
        -webkit-border-radius: 5px;
        border-radius: 5px 0 0 5px;
    }

    .ribbon-container:hover .ribbon.left {
        padding-left: 1em;
    }

    .h-filter {
        height: 650px;
    }
</style>

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