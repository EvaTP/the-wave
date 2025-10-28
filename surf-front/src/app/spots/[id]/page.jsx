"use client";
import { use } from "react";
import Image from "next/image";
import spots from "../../data/spots.json";
// import SpotCard from "../../../components/SpotCard";
import ButtonLink from "@/components/ButtonLink";
import useLikedSpots from "@/utils/useLikedSpots";

export default function SpotPage({ params }) {
  //const { id } = params;
  const { id } = use(params); // ✅ Utilisez use() pour déballer la Promise
  const spot = spots.find((s) => s.id === Number(id));
  const { isLiked, toggleLike } = useLikedSpots();

  if (!spot) {
    return <p className="text-center mt-10">Spot not found</p>;
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      {/* Image */}
      <div className="relative w-full h-80 mb-6">
        <Image
          src={spot.picture}
          alt={spot.name}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Infos principales */}
      <h1 className="text-3xl font-bold mb-2">{spot.name}</h1>
      <p className="text-3xl text-gray-700 font-semibold my-6">
        {spot.country}
      </p>
      <p className="text-gray-800 text-xl mb-6">{spot.description}</p>
      <p className="text-gray-900 text-xl mb-4">
        <strong>Level:</strong> {spot.level}
      </p>

      {/* Détails */}
      <section className="bg-sky-100 p-4 rounded-lg py-4 mb-2 drop-shadow-lg">
        <div className="flex flex-row items-center mb-4">
          <Image
            className="dark:invert mt-[-8px]"
            src="/map-pin-blue.svg"
            alt="map location icon"
            width={24}
            height={24}
            priority
          />
          <br />
          <p className="text-sky-700 text-centered text-2xl font-semibold">
            Spot details
          </p>
        </div>

        <ul className="space-y-2 text-gray-700">
          <li>
            <strong>Coordinates:</strong> {spot.coordinates.lat},{" "}
            {spot.coordinates.lng}
          </li>
          <li>
            <strong>Wave type:</strong> {spot.waveType}
          </li>
          <li>
            <strong>Best season:</strong> {spot.bestSeason}
          </li>
          <li>
            <strong>Tide:</strong> {spot.tide}
          </li>
          <li>
            <strong>Water temperature:</strong> {spot.waterTemperature}
          </li>
          <li>
            <strong>Crowd:</strong> {spot.crowd}
          </li>
          <li>
            <strong>Dangers:</strong> {spot.dangers.join(",")}
          </li>
          <li>
            <strong>Facilities:</strong> {spot.facilities.join(", ")}
          </li>
        </ul>

        <div className="flex flex-row gap-8 items-center">
          <button
            className="text-xl font-bold my-4 text-md px-6 py-3 rounded-2xl bg-blue-900 text-white"
            onClick={() => toggleLike(spot.id)}
          >
            {isLiked(spot.id) ? "❤️ Liked" : "🩶 Like this spot"}
          </button>
        </div>
      </section>
      <ButtonLink
        href="/"
        className="text-xl font-bold px-6 py-3 rounded-2xl shadow-sm my-4 text-md bg-blue-900 text-white"
      >
        🏄‍♂️ To Homepage
      </ButtonLink>
    </main>
  );
}
