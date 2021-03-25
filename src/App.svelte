<script>
	import { Router } from "@roxi/routify";
	import { routes } from "../.routify/routes";
	import { initClient } from "@urql/svelte";
	import { locale, timezoneOffset } from "@stores";

	initClient({
		url: "http://127.0.0.1:8080/graphql",
	});

	log.info($locale, $timezoneOffset);
</script>

<Router routes="{routes}" />
