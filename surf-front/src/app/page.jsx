"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SpotCard from "../components/SpotCard";
// import SpotsMap from "../components/SpotsMap";
import dynamic from "next/dynamic";
import { fetchSpots } from "@/lib/fetchSpots";
import DemoBanner from "@/components/DemoBanner";

// import différé client-only de SpotsMap
const SpotsMap = dynamic(() => import("@/components/SpotsMap"), {
  ssr: false,
});

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false); // savoir quand on peut rendre
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // vérifier l'état dans localStorage au chargement
  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(auth);
    setIsReady(true); // on peut afficher maintenant
  }, []);

  // récupérer les spots depuis le back-end
  useEffect(() => {
    const loadSpots = async () => {
      try {
        const data = await fetchSpots();
        setSpots(data);
      } catch (err) {
        console.error("Erreur fetchSpots :", err);
        setError("Impossible de charger les spots.");
      } finally {
        setLoading(false);
      }
    };
    loadSpots();
  }, []);

  // 🔴 évite un rendu prématuré (corrige les erreurs d'hydratation Next.js)
  if (!isReady) return null;

  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-10 gap-16 sm:p-20">
      <main className="flex flex-col gap-6 row-start-2 items-center text-center">
        <div className="flex flex-col -mt-18 mb-12 items-center">
          <Image
            className="dark:invert mt-[-8px]"
            src="/thewave.png"
            alt="The Wave logo"
            width={250}
            height={250}
            style={{ height: "auto" }}
            priority
          />
          <h1 className="font-lobster text-6xl md:text-8xl text-white drop-shadow-lg mt-4">
            🏄‍♂️ Worldwide Surf Spots
          </h1>
          <DemoBanner />
        </div>

        <p className="font-lobster text-4xl  text-sky-800 text-center font-bold italic">
          Welcome to the coolest surf spots location site in the world!
        </p>
        <div className="w-full h-[500px] mt-8">
          <p className="text-center text-sky-700 text-3xl font-bold mb-1">
            Surf Spots Map
          </p>
          <p className="text-sky-700 text-2xl text-center font-bold italic mb-4">
            Your next surf adventure is a click away...
          </p>
          <div className="rounded-2xl shadow-2xl overflow-hidden">
            <SpotsMap />
          </div>
        </div>

        {/* Liste des spots */}
        <div className="grid grid-cols-1 gap-6 mt-6sm:grid-cols-2 lg:grid-cols-3">
          {loading && <p className="text-xl mt-5">Chargement des spots...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading &&
            !error &&
            spots.map((spot) => <SpotCard key={spot.id} {...spot} />)}
        </div>
      </main>
    </div>
  );
}
