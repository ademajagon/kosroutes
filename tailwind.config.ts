import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          lightest: "#E8F5D6",
          light: "#E0EECD",
          DEFAULT: "#75A134",
          dark: "#466419",
          darkest: "#2F3427",
        },
      },
      textColor: {
        primary: "var(--olive12)",
        secondary: "var(--olive11)",
        tertiary: "var(--olive8)",
      },
      backgroundColor: {
        primary: "var(--olive1)",
        button: "var(--bg-button)",
        "button-hover": "var(--bg-button-hover)",
      },
      borderColor: {
        primary: "var(--olive6)",
        "primary-hover": "var(--olive7)",
        background: "var(--olive1)",
      },
    },
    maxWidth: {
      "1/2": "50%",
    },
  },
  plugins: [],
};
export default config;
