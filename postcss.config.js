const production = !process.env.ROLLUP_WATCH;
const tailwindcss = require("@tailwindcss/jit");
const tailwindcssProd = require("tailwindcss");
const purgecss = require("@fullhuman/postcss-purgecss");
const postcssPresetEnv = require("postcss-preset-env");
const cssnano = require("cssnano");

module.exports = {
	plugins: [
		require("postcss-import")(),
		!production && tailwindcss(),
		production && tailwindcssProd(),
		production &&
			purgecss({
				content: ["./public/**/*.html", "./src/**/*.{html,svelte}"],
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
