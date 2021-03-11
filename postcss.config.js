const production = !process.env.ROLLUP_WATCH;
const purgecss = require("@fullhuman/postcss-purgecss");
const tailwindcss = require('tailwindcss');

module.exports = {
    plugins: [
        require("postcss-import")(),
        tailwindcss('./tailwind.config.js'),
        require("autoprefixer"),
        // Only purge css on production
        production &&
        purgecss({
            content: ["./**/*.html", "./**/*.svelte"],
            defaultExtractor: content => content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
            safelist: [/^svelte-/]
        })
    ]
};