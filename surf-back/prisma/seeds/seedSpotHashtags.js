import { prisma } from "../../lib/prisma.js";

async function main() {
  // Récupération des spots et hashtags existants
  const spots = await prisma.spot.findMany();
  const hashtags = await prisma.hashtag.findMany();

  if (hashtags.length < 2) {
    throw new Error("Il faut au moins 2 hashtags pour chaque spot !");
  }

  for (const spot of spots) {
    // Mélanger les hashtags pour choisir 2 différents
    const shuffled = [...hashtags].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 2);

    for (const hashtag of selected) {
      await prisma.spot_hashtag.create({
        data: {
          spot_id: spot.id,
          hashtag_id: hashtag.id,
        },
      });
    }
  }

  console.log("✅ Spot_hashtags insérés !");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
