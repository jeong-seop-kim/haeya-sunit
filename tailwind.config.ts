import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      keyframes: {
        check: {
          "0%": { strokeDasharray: "0 100" },
          "100%": { strokeDasharray: "100 0" },
        },
      },
      animation: {
        check: "check 0.3s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
