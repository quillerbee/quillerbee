import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import 'firebase/auth';

const CLIENT_ID =
	'347772265103-t0bdrucu7j4u9uesjlagrraccgukt09t.apps.googleusercontent.com';

// FirebaseUI config.
const uiConfig = {
	callbacks: {},
	signInOptions: [
		// Leave the lines as is for the providers you want to offer your users.
		{
			provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,

			// Required to enable ID token credentials for this provider.
			clientId: CLIENT_ID,
			customParameters: {
				// Forces account selection even when one account
				// is available.
				prompt: 'select_account'
			},
		},
		firebase.auth.TwitterAuthProvider.PROVIDER_ID,
		firebase.auth.GithubAuthProvider.PROVIDER_ID,
		{
			provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
			// Whether the display name should be displayed in Sign Up page.
			requireDisplayName: true,
			signInMethod: 'password',
		},
	],
	signInFlow: 'popup',

	// tosUrl and privacyPolicyUrl accept either url string or a callback function.
	// Terms of service url/callback.
	tosUrl: 'https://quillerbee.commons.host',

	// Privacy policy url/callback.
	privacyPolicyUrl: 'https://quillerbee.commons.host',
	credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
};

export default uiConfig;
