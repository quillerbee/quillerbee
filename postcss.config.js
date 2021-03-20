const production = !process.env.ROLLUP_WATCH;
const tailwindcss = require("@tailwindcss/jit");
const cssnano = require("cssnano");

module.exports = {
	plugins: [
		require("postcss-import")(),
		tailwindcss(),
		production && require("autoprefixer"),
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
