<script>
    import { url } from "@roxi/routify";
</script>

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