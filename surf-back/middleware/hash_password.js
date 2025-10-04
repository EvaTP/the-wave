console.log("début du script de hashage");

import bcrypt from "bcrypt";
const saltRounds = 10; // Facteur de travail : nombre de fois que l'algorithme sera exécuté

// hasher un mot de passe
const hashPassword = async (plainPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("❌ Erreur lors du hachage :", error);
    throw error;
  }
};

// comparer les mots de passe (page login)
const verifyPassword = async (plainPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    console.error("❌ Erreur lors de la vérification :", error);
    throw error;
  }
};

export { hashPassword, verifyPassword };
