import App from "./App.svelte";
import loglevel from "loglevel";
import "./main.css";

if (process.env.NODE_ENV === "production") {
	loglevel.setLevel(loglevel.levels.ERROR);
} else {
	loglevel.setLevel(loglevel.levels.INFO);
}

window.loglevel = loglevel;
window.log = loglevel;

const app = new App({
	target: document.body,
});

export default app;
