import { API_BASE_URL } from "@/lib/api";

export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error("Erreur lors du chargement des utilisateurs");
  }
  return response.json();
};
