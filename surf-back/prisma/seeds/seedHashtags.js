import { prisma } from "../../lib/prisma.js";

async function main() {
  const hashtags = [
    { tagname: "reef" },
    { tagname: "pointbreak" },
    { tagname: "beachbreak" },
    { tagname: "bigwave" },
    { tagname: "sunset" },
    { tagname: "surftrip" },
    { tagname: "barrel" },
    { tagname: "dangerous" },
  ];

  for (const hashtag of hashtags) {
    await prisma.hashtag.upsert({
      where: { tagname: hashtag.tagname },
      update: {}, // rien à changer si le hashtag existe déjà
      create: hashtag,
    });
  }

  console.log("✅ Hashtags insérés ou mis à jour avec succès !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seed des hashtags :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
