import { hashPassword, verifyPassword } from "./middleware/hash_password.js";

const testPassword = async () => {
  console.log("🔐 Test du hachage...");

  const plainPassword = "nouveaumotdepasse";
  const hashed = await hashPassword(plainPassword);
  console.log("Mot de passe haché :", hashed);

  const isValid = await verifyPassword(plainPassword, hashed);
  // console.log(isValid ? "✅ Vérification OK" : "❌ Vérification échouée");
};

testPassword();

// commande de test dans le terminal : node test_hash.js
