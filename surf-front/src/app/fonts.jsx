import { Geist, Geist_Mono, Lobster } from "next/font/google";

// Déclaration des polices Google Fonts utilisées
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const lobster = Lobster({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  fallback: ["cursive", "sans-serif"],
});
