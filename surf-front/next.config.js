// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Option pour indiquer clairement à Turbopack la racine du projet front
  experimental: {
    // Vide pour l'instant, mais prêt à recevoir des options si besoin
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "img.redbull.com",
      },
      {
        protocol: "https",
        hostname: "60yearsaustraliaperu.com",
      },
      {
        protocol: "https",
        hostname: "img.20mn.fr",
      },
      {
        protocol: "https",
        hostname: "sportihome.com",
      },
      {
        protocol: "https",
        hostname: "hips.hearstapps.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
  },
};

module.exports = nextConfig;
