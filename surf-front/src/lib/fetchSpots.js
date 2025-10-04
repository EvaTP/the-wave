export const fetchSpots = async () => {
  const response = await fetch("http://localhost:3001/spots");
  if (!response.ok) {
    throw new Error("Erreur lors du chargement des spots");
  }
  return response.json();
};
