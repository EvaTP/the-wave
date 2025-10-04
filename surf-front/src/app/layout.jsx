import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FootLinks from "../components/FootLinks";
// import useAuth from "../utils/useAuth";
import { AuthProvider } from "../utils/useAuth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// metadata pour le SEO
export const metadata = {
  title: "🏄‍♂️ The Wave - Surf spots worldwide",
  description:
    "Discover the best surf spots worldwide 🌍. A mobile-first PWA to explore surfing destinations, share experiences, and connect with surfers.",
  applicationName: "The Wave",
  manifest: "/manifest.json", // fichier PWA
  themeColor: "#1f406e",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
        <FootLinks />
        <Footer />
      </body>
    </html>
  );
}
