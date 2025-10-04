import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.like.createMany({
    data: [
      // User 1 likes
      { user_id: 1, spot_id: 1 },
      { user_id: 1, spot_id: 5 },
      { user_id: 1, spot_id: 9 },
      { user_id: 1, spot_id: 17 },

      // User 2 likes
      { user_id: 2, spot_id: 2 },
      { user_id: 2, spot_id: 7 },
      { user_id: 2, spot_id: 14 },
      { user_id: 2, spot_id: 18 },

      // User 3 likes
      { user_id: 3, spot_id: 3 },
      { user_id: 3, spot_id: 6 },
      { user_id: 3, spot_id: 11 },
      { user_id: 3, spot_id: 15 },

      // User 4 likes
      { user_id: 4, spot_id: 4 },
      { user_id: 4, spot_id: 13 },
      { user_id: 4, spot_id: 16 },
      { user_id: 4, spot_id: 20 },

      // User 5 likes
      { user_id: 5, spot_id: 1 },
      { user_id: 5, spot_id: 5 },
      { user_id: 5, spot_id: 9 },
      { user_id: 5, spot_id: 12 },
      { user_id: 5, spot_id: 20 },

      // User 6 likes
      { user_id: 6, spot_id: 6 },
      { user_id: 6, spot_id: 13 },
      { user_id: 6, spot_id: 18 },
      { user_id: 6, spot_id: 21 },
    ],
  });

  console.log("✅ Likes insérés avec succès !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
