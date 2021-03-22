<script>
	import { Router } from "@roxi/routify";
	import { routes } from "../.routify/routes";
	import { initClient } from "@urql/svelte";

	initClient({
		url: "http://127.0.0.1:8080/graphql",
	});
</script>

<Router routes="{routes}" />
