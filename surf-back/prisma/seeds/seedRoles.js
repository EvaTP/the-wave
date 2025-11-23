import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: [
      {
        role: "admin",
        role_description: "site admin can create, update, or delete users",
      },
      {
        role: "moderator",
        role_description: "can moderate user content",
      },
      {
        role: "user",
        role_description: "regular user with limited permissions",
      },
      {
        role: "demo",
        role_description: "demo account with restricted access",
      },
    ],
    skipDuplicates: true, // pratique si tu relances le seed
  });
  console.log("✅ Roles insérés !");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
