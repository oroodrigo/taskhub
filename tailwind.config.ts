import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "375px",
      },
      colors: {
        form: {
          "toggle-button": {
            bg: {
              slate: "#94A3B8",
              green: "#16A34A",
            },
            slider: {
              white: "#fff",
            },
          },
        },
        menu: {
          active: {
            zinc: "#aeaeae33",
            green: "#57dd09b0",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
