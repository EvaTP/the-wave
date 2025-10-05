// hook personnalisé
"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/lib/api";

const useHashtags = (spotId, isAuthenticated = true) => {
  const [hashtags, setHashtags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHashtags = async () => {
    if (!spotId || !isAuthenticated) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/spots/${spotId}/hashtags`);

      if (!response.ok) {
        throw new Error(`Failed to fetch hashtags for spot ${spotId}`);
      }

      const data = await response.json();
      setHashtags(data);
    } catch (err) {
      console.error("Error fetching hashtags:", err);
      setError(err.message || "Failed to fetch hashtags");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHashtags();
  }, [spotId, isAuthenticated]);

  const refetch = () => {
    fetchHashtags();
  };

  return {
    hashtags,
    loading,
    error,
    refetch,
  };
};

export default useHashtags;
