import { PrismaClient } from "@prisma/client";
// const { PrismaClient } = require("@prisma/client");  (ancienne manière CommonJS)
// const spotsData = require("./spots.json");    (ancienne manière CommonJS)
// import spotsData from "./spots.json" assert { type: "json" };
import { readFile } from "fs/promises";
import { resolve } from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("🌊 Début du seeding des spots...");

  // Lecture du JSON
  const spotsPath = resolve("./prisma/seeds/spots.json");
  const spotsData = JSON.parse(await readFile(spotsPath, "utf-8"));

  for (const spot of spotsData) {
    // création du spot
    try {
      const createdSpot = await prisma.spot.create({
        data: {
          name: spot.name,
          country_spot: spot.country,
          lat: spot.coordinates?.lat || null,
          lng: spot.coordinates?.lng || null,
          url_spotpicture: spot.picture || null,
          description: spot.description || null,
          best_season: spot.bestSeason || null,
          wave_type: spot.waveType || null,
          tide: spot.tide || null,
          water_temperature: spot.waterTemperature || null,
          crowd: spot.crowd || null,
          dangers: spot.dangers || [],
          facilities: spot.facilities || [],
        },
      });

      console.log(`✅ Spot créé : ${createdSpot.name}`);

      // Puis on remplit la table de jointure Spot_level
      for (const levelId of spot.level || []) {
        await prisma.spot_level.create({
          data: {
            spot_id: createdSpot.id,
            level_id: levelId,
          },
        });
        console.log(`   ↳ associé au level ${levelId}`);
      }
    } catch (error) {
      console.error(`❌ Erreur pour le spot ${spot.name}:`, error.message);
    }
  }
  console.log("🌱 Seeding spots terminé !");
}

main()
  .catch((e) => {
    console.error("Erreur générale: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
