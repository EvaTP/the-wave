import { prisma } from "../../lib/prisma.js";

async function main() {
  // Supprimer toutes les associations dans Spot_hashtag
  await prisma.spot_hashtag.deleteMany();
  console.log("✅ Toutes les entrées Spot_hashtag supprimées !");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
