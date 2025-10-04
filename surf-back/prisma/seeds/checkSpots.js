// script pour vérifier les spots

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const spots = await prisma.spot.findMany({
    include: {
      spot_levels: {
        include: {
          level: true, // récupère les infos du niveau lié
        },
      },
    },
  });

  for (const spot of spots) {
    console.log(`🌊 Spot : ${spot.name}`);
    console.log(`Dangers : ${spot.dangers.join(", ")}`);
    console.log(`Facilities : ${spot.facilities.join(", ")}`);
    console.log("Niveaux associés :");
    if (spot.spot_levels.length === 0) {
      console.log(" - Aucun niveau associé");
    } else {
      for (const sl of spot.spot_levels) {
        console.log(` - ${sl.level.label}`);
      }
    }
    console.log("\n");
  }
}

main()
  .catch((e) => console.error("Erreur générale : ", e))
  .finally(async () => await prisma.$disconnect());
