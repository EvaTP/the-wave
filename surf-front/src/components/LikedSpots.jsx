"use client";
import { useState, useEffect } from "react";
import SpotCard from "./SpotCard";
import useLikedSpots from "../utils/useLikedSpots";
import ButtonLink from "./ButtonLink";
import { API_BASE_URL } from "@/lib/api";

export default function LikedSpots({ user }) {
  const [likedSpotsDetails, setLikedSpotsDetails] = useState([]);
  const [spotsLoading, setSpotsLoading] = useState(false);
  const [spotsError, setSpotsError] = useState(null);

  // Utiliser le même hook pour rester synchronisé
  const {
    likedSpots,
    loading: likesLoading,
    error: likesError,
    refetch,
  } = useLikedSpots();

  const fetchLikedSpotsDetails = async () => {
    if (!user?.id) return;

    try {
      setSpotsLoading(true);
      setSpotsError(null);

      const response = await fetch(`${API_BASE_URL}/likes/user/${user.id}`);
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setLikedSpotsDetails(data);
    } catch (err) {
      setSpotsError(err.message || "Erreur lors du chargement des spots likés");
    } finally {
      setSpotsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchLikedSpotsDetails();
    }
  }, [user?.id]);

  // Refetch quand les likes changent (optionnel, pour une synchronisation parfaite)
  useEffect(() => {
    if (!likesLoading && user?.id) {
      fetchLikedSpotsDetails();
    }
  }, [likedSpots.length, likesLoading, user?.id]);

  const isLoading = spotsLoading || likesLoading;
  const hasError = spotsError || likesError;
  const errorMessage = spotsError || likesError;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h3 className="text-xl sm:text-4xl md:text-5xl font-bold mb-4">
        ❤️ Your {likedSpots.length} favorite spots:
      </h3>

      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="text-lg">Loading your favorite spots...</div>
        </div>
      )}

      {hasError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>❌ {errorMessage}</p>
          <button
            onClick={() => {
              fetchLikedSpotsDetails();
              refetch(); // Refetch depuis le hook aussi
            }}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && !hasError && (
        <>
          {likedSpotsDetails.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4 text-xl">
                You haven't liked any spots yet.
              </p>

              <ButtonLink
                href="home"
                className="mt-4 mb-8 text-md px-3 py-1 rounded bg-blue-900 text-white"
              >
                🔎 Discover spots
              </ButtonLink>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {likedSpotsDetails.map((spot) => (
                <SpotCard key={spot.id} {...spot} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
