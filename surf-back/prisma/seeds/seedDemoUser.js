import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../../middleware/hash_password.js";

const prisma = new PrismaClient();

async function main() {
  // Récupérer l'id du rôle "demo"
  const demoRole = await prisma.role.findUnique({
    where: { role: "demo" },
  });

  if (!demoRole) {
    throw new Error('Le rôle "demo" n’existe pas. Lance d’abord seedRoles.');
  }
  console.log(`✅ Rôle 'demo' trouvé (ID: ${demoRole.id})`);

  // ⭐ NOUVEAU MOT DE PASSE
  const newPassword = "WaveRider2025!";
  console.log(
    `✅ Création/mise à jour du compte demo avec le mot de passe: ${newPassword}`
  );

  // Hasher le mot de passe AVANT l'upsert
  const hashedPassword = await hashPassword(newPassword);

  // Stocker le résultat du hashage dans la variable DemoUser
  const demoUser = await prisma.user.upsert({
    where: { username: "demo" },
    update: {
      // ⭐ SI LE USER EXISTE DÉJÀ, on met à jour le mot de passe
      password: hashedPassword,
    },
    create: {
      firstname: "Demo",
      lastname: "User",
      username: "demo",
      country_user: "FR",
      email: "demo@thewave.com",
      password: hashedPassword,
      url_userpicture: "/images/demo-account.png",
      role_id: demoRole.id,
    },
  });

  // dans le terminal, afficher les infos de connexion
  console.log("✅ Compte demo inséré ou mis à jour !");
  console.log("   👤 Username: demo");
  console.log("   🔑 Password:", newPassword);
  console.log("   📧 Email: demo@thewave.com");
  console.log("   🎭 Rôle: demo (ID:", demoRole.id, ")");
  console.log("   🆔 User ID:", demoUser.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
