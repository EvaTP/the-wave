"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState, useRef } from "react";
// import spotsData from "../app/data/spots.json";
import ButtonLink from "./ButtonLink";
import { useAuth } from "../utils/useAuth";
import { API_BASE_URL } from "@/lib/api";

// Icône personnalisée pour les spots
const spotMarker = new L.Icon({
  iconUrl: "/spot-marker.png",
  iconSize: [26, 26],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Correction des icônes par défaut Leaflet (Next.js)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// 🏄‍♂️ Composant Loader avec icône surfeur qui tourne
function SurfboardLoader() {
  return (
    <div className="absolute inset-0 z-[1000] flex flex-col items-center justify-center pointer-events-none">
      <div className="animate-spin-slow mt-8">
        <div className="text-9xl mt-16">🏄‍♂️</div>
      </div>
      <p className="text-sky-800 mt-8 text-6xl font-bold animate-pulse drop-shadow-lg">
        Chargement des spots...
      </p>
    </div>
  );
}

export default function SpotsMap() {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  // Éviter le double fetch avec useRef
  const hasFetched = useRef(false);

  useEffect(() => {
    // Si déjà fetch, on ne refait pas
    if (hasFetched.current) return;

    // Récupérer les spots depuis la base via l'API endpoint /spots/map
    const fetchSpots = async () => {
      try {
        // console.log("🗺️ Fetching spots from:", `${API_BASE_URL}/spots/map`);
        // const res = await fetch(`${API_BASE_URL}/spots/map`);
        // const url = `http://localhost:3001/spots/map`;  ⭐  TEST : Forcer local
        const url = `${API_BASE_URL}/spots/map`;
        console.log("😆 Fetching spots from /spots/map:", url);

        const res = await fetch(url);
        console.log("📡 Response status:", res.status);

        if (!res.ok) {
          const errorText = await res.text();
          console.error("❌ Erreur API:", errorText);
          throw new Error(`Erreur ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        console.log("✅", data.length, "spots récupérés");

        // Filtrer les spots avec coordonnées valides
        const validSpots = data.filter(
          (spot) =>
            spot.lat !== null &&
            spot.lng !== null &&
            !isNaN(parseFloat(spot.lat)) &&
            !isNaN(parseFloat(spot.lng))
        );

        console.log("📍", validSpots.length, "spots valides");
        setSpots(validSpots);

        // Marquer comme déjà fetch
        hasFetched.current = true;
      } catch (err) {
        console.error("❌ Erreur fetch:", err.message);
        setError(err.message);
      } finally {
        // ⭐ On arrête le loader après 500ms minimum (pour éviter le flash)
        setTimeout(() => setLoading(false), 500);
        // setLoading(false);
      }
    };

    fetchSpots();
  }, []); // ⭐ Dépendances vides + useRef = fetch une seule fois

  // ancien code de fetch (avant optimisation avec useRef)
  //       if (!res.ok)
  //         throw new Error("Erreur récupération spots (map)");
  //       const data = await res.json();
  //       setSpots(data);
  //     } catch (err) {
  //       console.error("Erreur SpotsMap fetch:", err);
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchSpots();
  // }, []);

  // Affichage d'erreur (carte + message d'erreur)
  if (error) {
    return (
      <div className="w-full h-[400px] rounded-lg shadow-lg overflow-hidden relative">
        <MapContainer center={[20, 0]} zoom={2} className="w-full h-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap"
          />
        </MapContainer>

        {/* Message d'erreur par-dessus */}
        <div className="absolute inset-0 bg-black/70 z-[1000] flex items-center justify-center">
          <div className="text-center p-6 bg-red-900/90 rounded-lg">
            <p className="text-red-200 text-xl mb-2">❌ Erreur</p>
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  //ancien code
  // if (loading) return <p className="text-xl mt-5">Chargement de la carte...</p>;
  // if (error)
  //   return <p className="text-red-500 text-xl mt-5">Erreur: {error}</p>;

  // ENLEVE : On ne rend MapContainer que si spots sont disponibles
  // if (!Array.isArray(spots) || spots.length === 0) {
  //   return (
  //     <div className="w-full h-[400px] flex items-center justify-center bg-gray-800 rounded-lg">
  //       <p className="text-xl text-white">Aucun spot disponible</p>
  //     </div>
  //   );
  // }

  console.log("📌 Spots utilisés pour affichage :", spots.length);

  return (
    <div className="w-full h-[400px] rounded-lg shadow-lg overflow-hidden">
      {/* 1. Carte affichée IMMÉDIATEMENT avant spots chargés */}
      <MapContainer
        key={`map-${spots.length}`} // Évite "Map container is being reused"
        // key={spots.length}  évite "Map container is being reused"
        center={[20, 0]} // Océan Atlantique pour un affichage global
        zoom={2}
        className="w-full h-full"
      >
        {/* Fond OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />

        {/* 2. Les markers s'ajoutent progressivement */}
        {spots.map((spot) => (
          <Marker
            key={spot.id}
            position={[parseFloat(spot.lat), parseFloat(spot.lng)]}
            icon={spotMarker}
          >
            <Popup>
              <div className="p-2">
                <strong className="text-base">{spot.name}</strong>
                <br />
                <span className="text-xs text-gray-600">
                  {spot.country_spot}
                </span>
                <br />
                {spot.level && (
                  <>
                    <span className="text-xs">Level: {spot.level}</span>
                    <br />
                  </>
                )}
                {isAuthenticated && (
                  <ButtonLink href={`/spots/${spot.id}`} className="mt-2">
                    GO
                  </ButtonLink>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* ANCIEN CODE : Affichage des markers uniquement si spots est un tableau */}
        {/* {Array.isArray(spots) &&
            spots.map((spot) => (
              <Marker
                key={spot.id}
                position={[parseFloat(spot.lat), parseFloat(spot.lng)]}
                // position={[spot.lat, spot.lng]}
                icon={spotMarker}
              >
                <Popup>
                  <div className="p-2">
                    <strong>{spot.name}</strong>
                    <br />
                    {spot.country_spot}
                    <br />

                    {/* ⭐ Avec /spots/map, spot.level est déjà formaté */}
        {/* {spot.level && (
                      <>
                        <span className="text-xs">Level: {spot.level}</span>
                        <br />
                      </>
                    )} */}

        {/* Level: {spot.level}
                    {spot.spot_levels?.map((sl) => sl.level.label).join(", ")} */}
        {/* {isAuthenticated && (
                      <ButtonLink href={`/spots/${spot.id}`} className="mt-2">
                        GO
                      </ButtonLink>
                    )}
                  </div>
                </Popup>
              </Marker> */}
      </MapContainer>

      {/* ⭐ Loader par-dessus la carte pendant le chargement */}
      {loading && <SurfboardLoader />}
    </div>
  );
}
