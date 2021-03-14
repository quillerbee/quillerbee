<script>
    import { url } from "@roxi/routify";
</script>

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