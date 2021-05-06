<script>
	import { Router } from "@roxi/routify";
	import { routes } from "../.routify/routes";
	import { initClient } from "@urql/svelte";
	import { locale, timezoneOffset } from "@stores";
	import Modal from 'svelte-simple-modal';
	import 'izitoast/dist/css/iziToast.min.css';

	import firebase from "firebase/app";
	import firebaseConfig from "@constants/firebase.config";

	firebase.initializeApp(firebaseConfig);
	
	initClient({
		url: "http://127.0.0.1:8080/graphql",
	});

	log.info($locale, $timezoneOffset);
</script>

<Modal>
<Router routes="{routes}" />
</Modal>
