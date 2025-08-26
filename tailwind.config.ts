import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        text: ['var(--font-text)', 'sans-serif'],
      },
      letterSpacing: {
        wider: ".2em",
        widest: ".32em"
      },
      maxWidth: {
        prose: "72ch"
      }
    },
  },
  plugins: [],
};
export default config;
