import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Island casual palette
        // 🌴 Coconut white / sand beige - backgrounds
        coconut: {
          DEFAULT: "#FFFDF7",
          50: "#FFFDF7",
          100: "#FDF8EE",
          200: "#F5EED9",
        },
        sand: {
          DEFAULT: "#F5E6D3",
          100: "#FAF3EB",
          200: "#F5E6D3",
          300: "#E8D4BC",
          400: "#D4BEA0",
        },
        // 🥭 Mango yellow / papaya orange - highlights & progress
        mango: {
          DEFAULT: "#FFB347",
          50: "#FFF8EB",
          100: "#FFEFD1",
          200: "#FFE0A3",
          300: "#FFD175",
          400: "#FFC147",
          500: "#FFB347",
          600: "#F59E0B",
          700: "#D97706",
        },
        papaya: {
          DEFAULT: "#FF8C42",
          50: "#FFF4EB",
          100: "#FFE4D1",
          200: "#FFC9A3",
          300: "#FFAE75",
          400: "#FF9A58",
          500: "#FF8C42",
          600: "#E67A35",
          700: "#CC6B2E",
        },
        // 🌊 Soft teal / lagoon blue - buttons, links
        lagoon: {
          DEFAULT: "#4ECDC4",
          50: "#EEFBFA",
          100: "#D0F4F1",
          200: "#A1E9E3",
          300: "#72DED5",
          400: "#4ECDC4",
          500: "#3DBEB5",
          600: "#2FA89F",
          700: "#248A83",
        },
        teal: {
          DEFAULT: "#2DD4BF",
          50: "#F0FDFA",
          100: "#CCFBF1",
          200: "#99F6E4",
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0D9488",
          700: "#0F766E",
        },
        // 🌺 Muted hibiscus pink - accents only
        hibiscus: {
          DEFAULT: "#E8A0BF",
          50: "#FDF2F7",
          100: "#FAE5EE",
          200: "#F5CBDD",
          300: "#E8A0BF",
          400: "#DB7FA6",
          500: "#C75D8A",
        },
        // Keep some utility colors
        charcoal: "#3D3D3D",
        primary: "#4ECDC4", // lagoon as primary
        secondary: "#FF8C42", // papaya as secondary
        accent: "#FFB347", // mango as accent
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
        phrase: ["var(--font-merriweather)", "Georgia", "serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "wiggle": "wiggle 1s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
