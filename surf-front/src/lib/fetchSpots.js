import { API_BASE_URL } from "@/lib/api";

export const fetchSpots = async () => {
  const response = await fetch(`${API_BASE_URL}/spots`);
  if (!response.ok) {
    throw new Error("Erreur lors du chargement des spots");
  }
  return response.json();
};
