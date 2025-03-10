/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],

    daisyui: {
        themes: true,
        darkTheme: "dracula",
        base: true,
        styled: true,
        utils: true,
        rtl: false,
        prefix: "",
        logs: true,
    },
}

