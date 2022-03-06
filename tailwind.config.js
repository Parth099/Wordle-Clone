module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                wblack: "#121213",
                wgray: "#3a3a3c",
            },
            borderWidth: {
                half: ".5px",
            },
        },
    },
    purge: {
        safelist: ["grid-cols-5", "grid-cols-6", "grid-cols-7", "grid-cols-8", "grid-rows-5", "grid-rows-6", "grid-rows-7", "grid-rows-8"],
    },
    plugins: [],
};
