<script>
  import { isChangingPage, metatags } from "@roxi/routify";
  import { Loader, Header, Footer } from "components";

  metatags.title = `Quiller Bee`;
  metatags.description = `One stop destination for hand curated, high quality, jobs from world's most valuable companies!`;
</script>

<Header />

<slot />

{#if $isChangingPage}
<Loader />
{/if}

<Footer />