module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.jsx",
        "./resources/**/*.vue",
    ],
    theme: {
        extend: {
            colors: {
                "hijau-telpon": "#249A8C",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
