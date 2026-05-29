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
        obsidian: "#0D0F0A",
        charcoal: "#141414",
        surface: "#1C1C1C",
        gold: "#C9A456",
        goldLight: "#E8C070",
        ivory: "#D4CFC4",
        navbarScroll: "rgba(13, 15, 10, 0.92)",
        cardBorderHover: "rgba(201, 164, 86, 0.25)",
        muted: "#8A8A7A",
        border: "#2A2A2A",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        "dot-bounce": {
          "0%, 80%, 100%": { transform: "scale(0)", opacity: "0.3" },
          "40%": { transform: "scale(1)", opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "chevron-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1.0)" },
          "100%": { transform: "scale(1.08)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite",
        "dot-bounce": "dot-bounce 1.4s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "chevron-bounce": "chevron-bounce 2s ease-in-out infinite",
        "ken-burns": "ken-burns 8s ease-out forwards",
        "marquee": "marquee 40s linear infinite",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
