module.exports = {
    darkMode: "class",
    mode: "jit",
    content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
    theme: {
        extends: {
            backgroundImage: {
                space: "url('/images/bg.png')",
            },
        },
    },
    variants: {
        scrollbar: ["dark"],
    },
    plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar")],
};
