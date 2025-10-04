// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lobster: ["Lobster", "cursive"],
      },
      colors: {
        //  themedark: "#1f406e", // Bleu foncé (logo, footer, titres)
        "theme-main": "#1f406e", // bleu foncé, couleur principale (textes, icônes)
        surfblue: "#3a7ca5", // Bleu moyen (barres, liens, hover)
        lagoon: "#00bfa6", // Vert lagon / turquoise (boutons, accents)
        sky: "#e0f7fa", // Bleu très clair (fonds, backgrounds doux)
      },
    },
  },
  plugins: [],
} satisfies Config;
