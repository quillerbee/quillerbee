module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	parserOptions: {
		ecmaVersion: 2019,
		sourceType: "module",
	},
	plugins: ["svelte3"],
	extends: ["airbnb"],
	overrides: [
		{
			files: ["**/*.svelte"],
			processor: "svelte3/svelte3",
		},
	],
	rules: {
		indent: ["error", "tab", { SwitchCase: 1 }],
		"no-tabs": "off",
		"import/prefer-default-export": "off",
		"object-curly-newline": "off"
	},
};
