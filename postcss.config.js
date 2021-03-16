const production = !process.env.ROLLUP_WATCH;
const purgecss = require("@fullhuman/postcss-purgecss");
const tailwindcss = require("tailwindcss");
const cssnano = require("cssnano");
const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
	plugins: [
		require("postcss-import")(),
		tailwindcss("./tailwind.config.js"),
		production &&
			purgecss({
				content: ["./**/*.html", "./**/*.svelte"],
				defaultExtractor: (content) =>
					content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
				safelist: [/^svelte-/],
			}),
		production && require("autoprefixer"),
		production && postcssPresetEnv(),
		production &&
			cssnano({
				preset: [
					"default",
					{
						discardComments: {
							removeAll: true,
						},
					},
				],
			}),
	],
};
