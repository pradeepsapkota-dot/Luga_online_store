import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                charcoal: "#171717",
                ivory: "#F7F3EC",
                terracotta: "#D95D39",
                gold: "#B99152",
                "gray-soft": "#E9E5DE",
            },
            fontFamily: {
                display: ["var(--font-display)", "serif"],
                sans: ["var(--font-sans)", "sans-serif"],
            },
            borderRadius: {
                card: "0.75rem",
            },
        },
    },
    plugins: [],
};

export default config;