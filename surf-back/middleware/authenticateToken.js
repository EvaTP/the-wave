import jwt from "jsonwebtoken";

// Clé secrète JWT (à mettre dans .env)
const JWT_SECRET = process.env.JWT_SECRET || "votre-cle-secrete-super-longue";

/**
 * Middleware pour vérifier le token JWT
 * @param {Request} req - Requête Express
 * @param {Response} res - Réponse Express
 * @param {NextFunction} next - Fonction next d'Express
 */
export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  // console.log("🔍 Middleware authenticateToken:", {
  //   hasAuthHeader: !!authHeader,
  //   hasToken: !!token,
  //   authHeaderPreview: authHeader
  //     ? authHeader.substring(0, 20) + "..."
  //     : "none",
  // });

  if (!token) {
    return res.status(401).json({
      error: "Token d'authentification manquant",
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Erreur vérification JWT:", err.message);
      return res.status(403).json({
        error: "Token invalide ou expiré",
      });
    }

    // Ajouter les informations utilisateur à la requête
    req.user = user;
    next();
  });
}
