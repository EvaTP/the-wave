export const fetchUsers = async () => {
  const response = await fetch("http://localhost:3001/users");
  if (!response.ok) {
    throw new Error("Erreur lors du chargement des utilisateurs");
  }
  return response.json();
};
