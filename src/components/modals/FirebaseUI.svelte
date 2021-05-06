<script>
	import { onMount } from 'svelte';
	import firebase from 'firebase';
	import * as firebaseui from 'firebaseui';
	import uiConfig from '@constants/firebase-ui.config';
	import 'firebaseui/dist/firebaseui.css';

	let ui = firebaseui.auth.AuthUI.getInstance();
	if (!ui) {
		ui = new firebaseui.auth.AuthUI(firebase.auth());
	}

	ui.disableAutoSignIn();

	onMount(() => {
		ui.start('#auth-container', uiConfig);
	});
</script>

<div id="auth-container">
</div>
