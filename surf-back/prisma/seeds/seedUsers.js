import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../../middleware/hash_password.js";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        firstname: "Robert",
        lastname: "Bodhisattva",
        username: "bodhi",
        country_user: "USA",
        email: "bodhi@mail.com",
        password: await hashPassword("1234xz"),
        url_userpicture:
          "https://i.pinimg.com/736x/32/ce/9f/32ce9f39e5e74f76d3aa01e63123bb84.jpg",
        role_id: 1,
      },
      {
        firstname: "Johnny",
        lastname: "Utah",
        username: "johnnyu",
        country_user: "UK",
        email: "johnny@hotmail.com",
        password: await hashPassword("5678xz"),
        url_userpicture:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ2rQiyL3Qh6ZwXjrLQQPJ6m4x2GKpnyKVHQ&s",
        role_id: 1,
      },
      {
        firstname: "Justine",
        lastname: "Dupont",
        username: "justined",
        country_user: "France",
        email: "justine@mail.com",
        password: await hashPassword("3456xz"),
        url_userpicture:
          "https://img.redbull.com/images/c_crop,x_0,y_0,h_2000,w_3000/c_fill,w_1850,h_1233/q_auto:low,f_jpg/redbullcom/2018/12/07/1df303e5-e898-48cc-b7da-a4b60b39b6bb/justine-dupont-lighthouse",
        role_id: 2,
      },
      {
        firstname: "Sofia",
        lastname: "Mulanovich",
        username: "sophy",
        country_user: "Peru",
        email: "sophy@mail.com",
        password: await hashPassword("2345ab"),
        url_userpicture:
          "https://60yearsaustraliaperu.com/wp-content/uploads/2022/10/Captura-de-Pantalla-2023-06-01-a-las-12.36.24-e1685641038574-768x767.png",
        role_id: 3,
      },
      {
        firstname: "Brice",
        lastname: "Nice",
        username: "brice",
        country_user: "France",
        email: "brice@gmail.com",
        password: await hashPassword("6789yz"),
        url_userpicture:
          "https://img.20mn.fr/HFIovlmwTFS4hyvQpM1_QQ/1444x920_jean-dujardin-film-brice-nice",
        role_id: 3,
      },
      {
        firstname: "Maryam",
        lastname: "ElGardoum",
        username: "maryamE",
        country_user: "Morocco",
        email: "maryam@hotmail.com",
        password: await hashPassword("7890lm"),
        url_userpicture:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSUhmKoiSrjYNoo4WjRA9jeYJ1mk1RMkonKg&s",
        role_id: 3,
      },
    ],
  });

  console.log("✅ Users insérés avec succès !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
