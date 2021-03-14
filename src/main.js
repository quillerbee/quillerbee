import App from './App.svelte';
import loglevel from 'loglevel';
import './main.css';

if (process.env.NODE_ENV === 'production') {
	loglevel.setLevel(loglevel.levels.ERROR);
} else {
	loglevel.setLevel(loglevel.levels.INFO);
}

window.loglevel = loglevel;
window.log = loglevel;

const app = new App({
	target: document.body
});

export default app;

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
	import('workbox-window').then(async ({ Workbox }) => {
		const wb = new Workbox('/sw.js');
		await wb.register();

		wb.addEventListener('installed', () => (log.info('Installed Service Worker')));
		wb.addEventListener('externalinstalled', () => (log.info('Externally Installed Service Worker')));
		wb.addEventListener("redundant", () => {
			location.reload();
			log.info("Updated App");
		});
	})
}