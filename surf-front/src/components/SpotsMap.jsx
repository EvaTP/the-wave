"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
// import { useEffect, useState, useRef } from "react";
// import spotsData from "../app/data/spots.json";
import ButtonLink from "./ButtonLink";
import { useAuth } from "../utils/useAuth";
import { API_BASE_URL } from "@/lib/api";

// Icône personnalisée pour les marqueurs de spots
const spotMarker = new L.Icon({
  iconUrl: "/spot-marker.png",
  iconSize: [26, 26],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Correction des icônes par défaut Leaflet (avec Next.js)
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
        <div className="text-9xl">🏄‍♂️🏄‍♀️</div>
      </div>
      <p className="text-sky-800 mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold animate-pulse drop-shadow-lg text-center">
        Chargement des spots...
      </p>
    </div>
  );
}

// Le composant reçoit maintenant 'spots' et 'loading' directement depuis son parent
// ancien code
// export default function SpotsMap() {
//   const [spots, setSpots] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { isAuthenticated } = useAuth();

//   // Éviter le double fetch avec useRef
//   const hasFetched = useRef(false);

//   useEffect(() => {
//     // Si déjà fetch, on ne refait pas
//     if (hasFetched.current) return;

//     // Récupérer les spots depuis la base via l'API endpoint /spots/map
//     const fetchSpots = async () => {
//       try {
//         // console.log("⭐ Fetching spots from:", `${API_BASE_URL}/spots/map`);
//         const url = `${API_BASE_URL}/spots/map`;
//         console.log("😆 Fetching spots from /spots/map:", url);

//         const res = await fetch(url);
//         console.log("📡 Response status:", res.status);

//         if (!res.ok) {
//           const errorText = await res.text();
//           console.error("❌ Erreur API:", errorText);
//           throw new Error(`Erreur ${res.status}: ${res.statusText}`);
//         }

//         const data = await res.json();
//         console.log("✅", data.length, "spots récupérés");

//         // Filtrer les spots avec coordonnées valides
//         const validSpots = data.filter(
//           (spot) =>
//             spot.lat !== null &&
//             spot.lng !== null &&
//             !isNaN(parseFloat(spot.lat)) &&
//             !isNaN(parseFloat(spot.lng)),
//         );

//         console.log("📍", validSpots.length, "spots valides");
//         setSpots(validSpots);

//         // Marquer comme déjà fetch
//         hasFetched.current = true;
//       } catch (err) {
//         console.error("❌ Erreur fetch:", err.message);
//         setError(err.message);
//       } finally {
//         // ⭐ On arrête le loader après 500ms minimum (pour éviter le flash)
//         setTimeout(() => setLoading(false), 500);
//         // setLoading(false);
//       }
//     };
//     fetchSpots();

//   }, []); // ⭐ Dépendances vides + useRef = fetch une seule fois

//   // Affichage d'erreur (carte + message d'erreur)
//   if (error) {
//     return (
//       <div className="w-full h-[400px] rounded-lg shadow-lg overflow-hidden relative">
//         <MapContainer center={[20, 0]} zoom={2} className="w-full h-full">
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution="&copy; OpenStreetMap"
//           />
//         </MapContainer>

//         {/* Message d'erreur par-dessus */}
//         <div className="absolute inset-0 bg-black/70 z-[1000] flex items-center justify-center">
//           <div className="text-center p-6 bg-red-900/90 rounded-lg">
//             <p className="text-red-200 text-xl mb-2">❌ Erreur</p>
//             <p className="text-red-300 text-sm">{error}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   console.log("📌 Spots utilisés pour affichage :", spots.length);

//   return (
//     <div className="w-full h-[400px] rounded-lg shadow-lg overflow-hidden relative">
//       {/* 1. Carte affichée IMMÉDIATEMENT avant spots chargés */}
//       <MapContainer
//         key={`map-${spots.length}`} // Évite "Map container is being reused"
//         // key={spots.length}  évite "Map container is being reused"
//         center={[20, 0]} // Océan Atlantique pour un affichage global
//         zoom={2}
//         className="w-full h-full"
//       >
//         {/* Fond OpenStreetMap */}
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
//         />

//         {/* 2. Les markers s'ajoutent progressivement */}
//         {spots.map((spot) => (
//           <Marker
//             key={spot.id}
//             position={[parseFloat(spot.lat), parseFloat(spot.lng)]}
//             icon={spotMarker}
//           >
//             <Popup>
//               <div className="p-2">
//                 <strong className="text-base">{spot.name}</strong>
//                 <br />
//                 <span className="text-xs text-gray-600">
//                   {spot.country_spot}
//                 </span>
//                 <br />
//                 {spot.level && (
//                   <>
//                     <span className="text-xs">Level: {spot.level}</span>
//                     <br />
//                   </>
//                 )}
//                 {isAuthenticated && (
//                   <ButtonLink href={`/spots/${spot.id}`} className="mt-2">
//                     GO
//                   </ButtonLink>
//                 )}
//               </div>
//             </Popup>
//           </Marker>
//         ))}
//       </MapContainer>

//       {/* ⭐ Loader par-dessus la carte pendant le chargement */}
//       {loading && <SurfboardLoader />}
//     </div>
//   );
// }
export default function SpotsMap({ spots = [], loading = false }) {
  const { isAuthenticated } = useAuth();

  // On vérifie que les spots ont bien des coordonnées GPS valides (latitude et longitude)
  const validSpots = spots.filter(
    (spot) =>
      spot.lat !== null &&
      spot.lng !== null &&
      !isNaN(parseFloat(spot.lat)) &&
      !isNaN(parseFloat(spot.lng)),
  );

  return (
    <div className="w-full h-[400px] rounded-lg shadow-lg overflow-hidden relative">
      <MapContainer
        key={`map-${validSpots.length}`} // Re-crée la carte proprement quand les spots arrivent
        center={[20, 0]} // Centre la vue globale sur l'océan
        zoom={2}
        className="w-full h-full"
      >
        {/* Fond de carte OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />

        {/* Création d'un marqueur pour chaque spot valide */}
        {validSpots.map((spot) => (
          <Marker
            key={spot.id}
            position={[parseFloat(spot.lat), parseFloat(spot.lng)]}
            icon={spotMarker}
          >
            <Popup>
              <div className="p-2">
                <strong className="text-base">{spot.name}</strong>
                <br />
                {spot.country_spot && (
                  <span className="text-xs text-gray-600">
                    {spot.country_spot}
                  </span>
                )}
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
      </MapContainer>

      {/* Affiche le surfeur tant que la page parent charge les données */}
      {loading && <SurfboardLoader />}
    </div>
  );
}
