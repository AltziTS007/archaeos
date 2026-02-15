import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                azure: {
                    DEFAULT: '#004e98',
                    dark: '#003366',
                    light: '#0066cc',
                },
                gold: {
                    DEFAULT: '#f1c40f',
                    dark: '#d4a017',
                    light: '#ffd700',
                },
                parchment: {
                    DEFAULT: '#fdfbf7',
                    dark: '#f5f1e8',
                },
                ancient: {
                    stone: '#8b7355',
                    marble: '#e8e4d9',
                    bronze: '#cd7f32',
                }
            },
            fontFamily: {
                cinzel: ['Cinzel', 'serif'],
                inter: ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'ancient-pattern': "url('/images/ancient-pattern.svg')",
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'slide-in-right': 'slideInRight 0.3s ease-out',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(241, 196, 15, 0.5)' },
                    '100%': { boxShadow: '0 0 20px rgba(241, 196, 15, 0.8)' },
                },
                slideInRight: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
