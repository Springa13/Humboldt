// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/**/*.{html,js,svelte,ts}', // This line is crucial
    ],
    theme: {
        extend: {
            fontFamily: {
                // 'spectral' is the utility class name you will use
                // 'Spectral' is the CSS font family name
                // 'sans' is the fallback font for when Spectral fails to load
                spectral: ['Spectral', 'serif'], 
            },
        },
    },
    plugins: [],
};