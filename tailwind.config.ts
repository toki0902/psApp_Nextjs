import { transform } from "next/dist/build/swc/generated-native";
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
        "drop-in-forModal": "drop-in-forModal .3s",
        "focus-in":
          "focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both",
        "blur-out":
          "blur-out 1s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both",
        "dot-first": "dot-first 4s infinite",
        "dot-second": "dot-second 4s infinite",
        "dot-third": "dot-third 4s infinite",
        shake: "shake 1s linear 1",
      },
      keyframes: {
        "drop-in-forModal": {
          from: { transform: "translate(-50%, -60%)", opacity: "0" },
          to: { transform: "translate(-50%, -50%)", opacity: "1" },
        },
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
        shake: {
          "0%": { transform: "translate(0%, 0%)" },
          "5%": { transform: "translate(10%, 0%) rotate(10deg)" },
          "25%": { transform: "translate(20%, 0%) rotate(20deg)" },
          "30% ": { transform: "translate(-10%, 0%) rotate(-10deg)" },
          "35%": { transform: "translate(-15%, 0%) rotate(-15deg)" },
          "45%": { transform: "translate(10%, 0%) rotate(10deg)" },
          "50%": { transform: "translate(15%, 0%) rotate(15deg)" },
          "60% ": { transform: "translate(-5%, 0%) rotate(-5deg)" },
          "65%": { transform: "translate(-7%, 0%) rotate(-7deg)" },
          "75%": { transform: "translate(0%, 0%) rotate(0deg)" },
          to: { transform: "translate(0%, 0%) rotate(0deg)" },
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
