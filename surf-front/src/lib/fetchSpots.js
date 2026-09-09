import { API_BASE_URL } from "@/lib/api";

// export const fetchSpots = async () => {
//   const response = await fetch(`${API_BASE_URL}/spots`);
//   if (!response.ok) {
//     throw new Error("Erreur lors du chargement des spots");
//   }
//   return response.json();
// };

// Ajout d'un délai artificiel pour simuler le chargement
// export async function fetchSpots() {
// ⏱️ DÉLAI TEMPORAIRE POUR TESTER
//   await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 secondes

//   const response = await fetch(`${API_BASE_URL}/spots`); // mon URL
//   if (!response.ok) throw new Error("Failed to fetch spots");
//   return response.json();
// }

/**
 * Récupère la liste des spots de surf depuis le serveur back-end.
 * @returns {Promise<Array>} Tableau contenant les objets spots
 */

export async function fetchSpots() {
  const response = await fetch(`${API_BASE_URL}/spots`);

  if (!response.ok) {
    throw new Error(
      `Erreur lors du chargement des spots (statut: ${response.status})`,
    );
  }
  return response.json();
}
