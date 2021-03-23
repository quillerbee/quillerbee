import App from "./App.svelte";
import loglevel from "loglevel";
import "./main.css";

loglevel.setLevel(process.env.NODE_ENV === "production" ? loglevel.levels.ERROR : loglevel.levels.INFO);

window.loglevel = loglevel;
window.log = loglevel;

const app = new App({
	target: document.body,
});

export default app;
