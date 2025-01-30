import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      width: {
        "sixth-divided": "calc(94% / 6)",
        "fifth-divided": "calc(95% / 5)",
        "fourth-divided": "calc(96% / 4)",
        "third-divided": "calc(97% / 3)",
        "half-divided": "calc(98% / 2)",
      },
      colors: {
        red: "var(--red)",
        back: "var(--white)",
        blue: "var(--blue)",
      },
      animation: {
        slowSpin: "spin 8s linear infinite",
        "focus-in":
          "focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both",
        "blur-out":
          "blur-out 1s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both",
        "dot-first": "dot-first 4s infinite",
        "dot-second": "dot-second 4s infinite",
        "dot-third": "dot-third 4s infinite",
      },
      keyframes: {
        "focus-in": {
          "0%": {
            filter: "blur(12px)",
            opacity: "0",
          },
          to: {
            filter: "blur(0)",
            opacity: "1",
          },
        },
        "blur-out": {
          "0%": {
            filter: "blur(.01)",
          },
          to: {
            filter: "blur(12px)",
            opacity: "0",
          },
        },
        "dot-first": {
          "0%,24.9%": { opacity: "0" },
          "25%": { opacity: "1" },
          to: { opacity: "1" },
        },
        "dot-second": {
          "0%,49.9%": { opacity: "0" },
          "50%": { opacity: "1" },
          to: { opacity: "1" },
        },
        "dot-third": {
          "0%,74.9%": { opacity: "0" },
          "75%": { opacity: "1" },
          to: { opacity: "1" },
        },
      },
      screens: {
        "3xl": "1700px",
        "4xl": "2100px",
      },
    },
  },
  plugins: [],
};
export default config;
