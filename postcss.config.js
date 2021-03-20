const production = !process.env.ROLLUP_WATCH;
const tailwindcss = require("@tailwindcss/jit");
const tailwindcssProd = require("tailwindcss");
const cssnano = require("cssnano");

module.exports = {
	plugins: [
		require("postcss-import")(),
		!production && tailwindcss(),
		production && tailwindcssProd(),
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
