"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
// import spotsData from "../app/data/spots.json";
import ButtonLink from "./ButtonLink";
import { useAuth } from "../utils/useAuth";

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

export default function SpotsMap() {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  // Récupérer les spots depuis la base via l'API endpoint
  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const res = await fetch("http://localhost:3001/spots");
        if (!res.ok) throw new Error("Erreur récupération spots");
        const data = await res.json();
        setSpots(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSpots();
  }, []);

  if (loading) return <p>Chargement des spots...</p>;
  if (error) return <p className="text-red-500">Erreur: {error}</p>;

  return (
    <div className="w-full h-[400px] rounded-lg shadow-lg overflow-hidden">
      <MapContainer
        center={[20, 0]} // Océan Atlantique pour un affichage global
        zoom={1}
        className="w-full h-full"
      >
        {/* Fond OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />

        {/* Affichage des markers uniquement si spots est un tableau */}
        {Array.isArray(spots) &&
          spots.map((spot) => (
            <Marker
              key={spot.id}
              position={[spot.lat, spot.lng]}
              icon={spotMarker}
            >
              <Popup>
                <strong>{spot.name}</strong>
                <br />
                {spot.country_spot}
                <br />
                Level:{" "}
                {spot.spot_levels?.map((sl) => sl.level.label).join(", ")}
                {isAuthenticated && (
                  <ButtonLink href={`/spots/${spot.id}`} className="mt-2">
                    GO
                  </ButtonLink>
                )}
                {/* <ButtonLink href={`/spots/${spot.id}`} className="mt-2">
                  GO
                </ButtonLink> */}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}

// "use client";

// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import spots from "../app/data/spots.json";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import dynamic from "next/dynamic";

// // Charger MapContainer seulement côté client
// const MapContainer = dynamic(
//   () => import("react-leaflet").then((mod) => mod.MapContainer),
//   { ssr: false }
// );
// const TileLayer = dynamic(
//   () => import("react-leaflet").then((mod) => mod.TileLayer),
//   { ssr: false }
// );
// const Marker = dynamic(
//   () => import("react-leaflet").then((mod) => mod.Marker),
//   { ssr: false }
// );
// const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
//   ssr: false,
// });

// // créer une icône personnalisée
// const spotMarker = new L.Icon({
//   iconUrl: "/spot-marker.png",
//   iconSize: [26, 26],
//   iconAnchor: [16, 32],
//   popupAnchor: [0, -32], // position du popup par rapport à l’icône
// });

// // correction des icônes leaflet (sinon elles ne s’affichent pas dans Next.js)
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//   iconUrl: require("leaflet/dist/images/marker-icon.png"),
//   shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
// });

// export default function SpotsMap({ spots }) {
//   return (
//     <MapContainer
//       center={[20, 0]} // position initiale (océan Atlantique)
//       zoom={2}
//       style={{ height: "300px", width: "100%" }}
//     >
//       {/* fond de carte OpenStreetMap */}
//       <TileLayer
//         attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />

//       {/* spots surf */}
//       {spots.map((spot) => (
//         <Marker
//           key={spot.id}
//           position={[spot.coordinates.lat, spot.coordinates.lng]}
//           icon={spotMarker}
//         >
//           <Popup>
//             <strong>{spot.name}</strong>
//             <p>{spot.country}</p>
//             <p>Level: {spot.level}</p>
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// }
