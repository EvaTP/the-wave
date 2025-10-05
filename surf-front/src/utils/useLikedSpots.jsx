// hook personnalisé

"use client";
import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { API_BASE_URL } from "@/lib/api";

export default function useLikedSpots() {
  const [likedSpots, setLikedSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isAuthenticated } = useAuth();

  // récupérer les spots likés depuis la BDD
  useEffect(() => {
    async function fetchLikedSpots() {
      if (!isAuthenticated || !user?.id) {
        setLikedSpots([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/likes/user/${user.id}`);

        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const likedSpotsData = await response.json();
        setLikedSpots(likedSpotsData.map((spot) => spot.id));
        setError(null);
      } catch (err) {
        console.error("Erreur lors du chargement des likes:", err);
        setError(err.message || "Erreur lors du chargement des likes");
        setLikedSpots([]);
      } finally {
        setLoading(false);
      }
    }

    fetchLikedSpots();
  }, [isAuthenticated, user?.id]);

  // Fonction pour vérifier si un spot est liké
  const isLiked = (spotId) => {
    return likedSpots.includes(spotId);
  };

  // Fonction pour toggler un like
  const toggleLike = async (spotId) => {
    if (!isAuthenticated || !user?.id) {
      console.error("User not authenticated");
      return;
    }

    const wasLiked = isLiked(spotId);

    try {
      if (!wasLiked) {
        // Créer le like (POST)
        const response = await fetch("http://localhost:3001/likes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user.id,
            spot_id: spotId,
          }),
        });

        if (response.ok) {
          setLikedSpots((prev) => [...prev, spotId]);
          setError(null);
        } else {
          const errorData = await response.json();
          console.error("Erreur lors de la création du like:", errorData);
          setError("Erreur lors de la création du like");
        }
      } else {
        // Supprimer le like (DELETE) - adapter selon votre API
        const response = await fetch(
          `http://localhost:3001/likes/${user.id}/${spotId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setLikedSpots((prev) => prev.filter((id) => id !== spotId));
          setError(null);
        } else {
          console.error("Erreur lors de la suppression du like");
          setError("Erreur lors de la suppression du like");
        }
      }
    } catch (err) {
      console.error("Erreur réseau lors du toggle like:", err);
      setError("Erreur réseau");
    }
  };

  return {
    likedSpots,
    loading,
    error,
    isLiked,
    toggleLike,
  };
}

// const toggleLike = (id) => {
//   let updated;
//   if (likedSpots.includes(id)) {
//     updated = likedSpots.filter((spotId) => spotId !== id);
//   } else {
//     updated = [...likedSpots, id];
//   }
//   setLikedSpots(updated);
//   localStorage.setItem("likedSpots", JSON.stringify(updated));
// };

// const isLiked = (id) => Array.isArray(likedSpots) && likedSpots.includes(id);

// return { likedSpots, toggleLike, isLiked };
