<script>
    import { goto } from "@roxi/routify";
    import { DayAndNightToggle, InteractiveBackground, SkipLink, CloudWave } from "./";
    import Logo from '../Logo.svelte';
</script>

<header class="relative w-full mb-16">
    <nav class="fixed z-10 flex items-center justify-between w-full h-16 p-5 pointer-events-none frosted-glass">
        <SkipLink />
        <Logo />
        <div class="flex items-center">
            <DayAndNightToggle />
            <button on:click="{(e)=> {$goto('/admin'); e?.target?.blur();}}"
                class="outline-none buttons btn-hover color-3 focus:outline-none focus:ring-2 focus:ring-purple-500">
                Post a Job
            </button>
        </div>
    </nav>
    <InteractiveBackground />
    <CloudWave />
</header>