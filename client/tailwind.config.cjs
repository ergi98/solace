/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            aspectRatio: {
                "photo": "1 / 1.5",
            },
        },
    },
    plugins: [],
};
