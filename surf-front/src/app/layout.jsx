import { geistSans, geistMono } from "./fonts";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthProvider } from "../utils/useAuth";

// metadata pour le SEO et PWA
export const metadata = {
  title: "🏄‍♂️ The Wave - Surf spots worldwide",
  description:
    "Discover the best surf spots worldwide 🌍. A mobile-first PWA to explore surfing destinations, share experiences, and connect with surfers.",
  applicationName: "The Wave",
  manifest: "/manifest.json", // fichier PWA
};

// themeColor séparé de metadata (obligatoire pour le manifest PWA depuis Next 14+ (App Router + manifest.json))
export const themeColor = "#1f406e";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrapper flex pour coller le footer en bas */}
        <div className="min-h-screen flex flex-col">
          {/* AuthProvider englobe toute l'appli pour l'accès aux infos utilisateur */}
          <AuthProvider>
            <Navbar />

            {/* flex-1 pour que le contenu prenne tout l'espace */}
            <main className="flex-1">{children}</main>
          </AuthProvider>
        </div>

        {/* footer hors du flow pour éviter CLS */}
        <Footer className="absolute bottom-0 left-0 right-0 w-full h-[260px]" />
      </body>
    </html>
  );
}
