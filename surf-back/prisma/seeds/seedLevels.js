import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.level.createMany({
    data: [
      { label: "Beginner" },
      { label: "Intermediate" },
      { label: "Advanced" },
      { label: "Expert" },
    ],
  });

  console.log("✅ Levels insérés avec succès !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
