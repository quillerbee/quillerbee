<script>
    import { url } from "@roxi/routify";
</script>

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