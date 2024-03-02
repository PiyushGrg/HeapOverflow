import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Providers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#053B50",
        secondary: "#A73121",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    layout : {
      radius : {
        small: "2px",
        medium: "4px",
        large: "6px",
      }
    }
  })],
};
export default config;
