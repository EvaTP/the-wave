// configuration de l'URL de base de l'API centralisée
// fournit un point d'accès unique pour les appels API dans toute l'application
// (si la varible d'environnement existe on utiliser l'url de Render, sinon on utilise localhost:3001 pour le dev local)
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
