import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.comment.createMany({
    data: [
      {
        content: "Amazing waves, perfect for beginners!",
        user_id: 1,
        spot_id: 1,
      },
      { content: "Great spot, often crowded but fun.", user_id: 2, spot_id: 2 },
      {
        content: "Beautiful scenery, waves can be tricky.",
        user_id: 3,
        spot_id: 3,
      },
      {
        content: "Consistent waves, ideal for longboarding.",
        user_id: 4,
        spot_id: 4,
      },
      { content: "Perfect for sunset sessions.", user_id: 5, spot_id: 5 },
      {
        content: "Challenging waves, not for beginners.",
        user_id: 6,
        spot_id: 6,
      },
      {
        content: "Friendly locals and nice beach vibe.",
        user_id: 3,
        spot_id: 7,
      },
      {
        content: "Occasional big waves, check conditions!",
        user_id: 4,
        spot_id: 8,
      },
      {
        content: "Beautiful reef, amazing for experienced surfers.",
        user_id: 1,
        spot_id: 9,
      },
      { content: "Wide sandy beach, lots of space.", user_id: 2, spot_id: 10 },
      { content: "Fast waves, fun for shortboards.", user_id: 3, spot_id: 11 },
      {
        content: "Perfect waves early morning, peaceful.",
        user_id: 5,
        spot_id: 12,
      },
      {
        content: "Crowded on weekends, try weekdays.",
        user_id: 6,
        spot_id: 13,
      },
      { content: "Great surf schools nearby.", user_id: 2, spot_id: 14 },
      { content: "Friendly atmosphere, good waves.", user_id: 3, spot_id: 15 },
      { content: "Watch out for strong currents.", user_id: 4, spot_id: 16 },
      { content: "Fun waves, beautiful beach.", user_id: 1, spot_id: 17 },
      { content: "Quiet spot, great for practice.", user_id: 2, spot_id: 18 },
      {
        content: "Challenging waves, very rewarding.",
        user_id: 3,
        spot_id: 19,
      },
      {
        content: "Perfect for longboarders, relaxed vibe.",
        user_id: 6,
        spot_id: 20,
      },
    ],
  });

  console.log("✅ Comments insérés avec succès !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
