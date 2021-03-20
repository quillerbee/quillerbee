import alias from "@rollup/plugin-alias";
import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import cleaner from "rollup-plugin-cleaner";
import sveltePreprocess from "svelte-preprocess";
import replace from "@rollup/plugin-replace";

const production = !process.env.ROLLUP_WATCH;
const path = require("path");

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require("child_process").spawn(
				"npm",
				["run", "start", "--", "--dev"],
				{
					stdio: ["ignore", "inherit", "inherit"],
					shell: true,
				}
			);

			process.on("SIGTERM", toExit);
			process.on("exit", toExit);
		},
	};
}

export default {
	input: "src/main.js",
	output: {
		sourcemap: !production,
		format: "esm",
		name: "app",
		dir: "public/build",
		// For Performance, disabling filename hashing in development
		// chunkFileNames: `[name]${(production && "-[hash]") || ""}.js`,
		// For Netlify, disabling hashing entirely. See: https://answers.netlify.com/t/support-guide-making-the-most-of-netlifys-cdn-cache/127
		chunkFileNames: "[name].js",
	},
	plugins: [
		postcss({ extract: "bundle.css" }),
		svelte({
			preprocess: sveltePreprocess({
				babel: {
					presets: [
						[
							"@babel/preset-env",
							{
								loose: true,
								modules: false,
								targets: {
									esmodules: true,
								},
							},
						],
					],
				},
			}),
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production,
			},
		}),
		cleaner({
			targets: ["public/build/"],
		}),

		alias({
			entries: {
				components: path.resolve(__dirname, "./src/components"),
			},
		}),

		replace({
			preventAssignment: true,
			"process.env.NODE_ENV": JSON.stringify(production && "production"),
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			main: true,
			dedupe: ["svelte", "svelte/transition", "svelte/internal"],
			preferBuiltins: false,
		}),
		commonjs({
			esmExternals: ["/node_modules/@roxi/routify"],
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),
	],
	watch: {
		clearScreen: false,
	},
};
