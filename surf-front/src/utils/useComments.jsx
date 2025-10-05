// utils/useComments.js
"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/lib/api";

const useComments = (spotId, isAuthenticated = true) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    if (!spotId || !isAuthenticated) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/spots/${spotId}/comments`);

      if (!response.ok) {
        throw new Error(`Failed to fetch comments for spot ${spotId}`);
      }

      const data = await response.json();
      setComments(data);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError(err.message || "Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [spotId, isAuthenticated]);

  return {
    comments,
    loading,
    error,
    refetch: fetchComments,
  };
};

export default useComments;
