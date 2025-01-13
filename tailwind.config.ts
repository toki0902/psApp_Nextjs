import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        red: "var(--red)",
        white: "var(--white)",
        blue: "var(--blue)",
      },
    },
  },
  plugins: [],
};
export default config;
