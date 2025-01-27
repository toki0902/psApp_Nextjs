import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        red: "var(--red)",
        back: "var(--white)",
        blue: "var(--blue)",
      },
      animation: {
        slowSpin: "spin 8s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
