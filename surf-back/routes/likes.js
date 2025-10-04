import { Router } from "express";
import { prisma } from "./../lib/prisma.js";

const router = Router();

// GET tous les likes
router.get("/", async (req, res) => {
  try {
    const likes = await prisma.like.findMany({
      include: {
        user: true,
        spot: true,
      },
    });
    res.json(likes);
  } catch (error) {
    console.error("Erreur Prisma :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la récupération des likes.",
    });
  }
});

// GET likes BY ID
router.get("/:id", async (req, res) => {
  try {
    const like = await prisma.like.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        user: true,
        spot: true,
      },
    });
    res.json(like);
  } catch (error) {
    console.error("Erreur Prisma :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la récupération du like.",
    });
  }
});

// afficher les likes par USER ID
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const likedSpots = await prisma.like.findMany({
      where: { user_id: userId },
      include: {
        spot: {
          include: {
            spot_levels: {
              include: {
                level: true,
              },
            },
            comments: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    // Retourner les spots complets avec toutes les données
    const spots = likedSpots.map((like) => like.spot);
    res.json(spots);
  } catch (error) {
    console.error("Erreur lors de la récupération des spots likés :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la récupération des spots likés.",
    });
  }
});
//     const likes = await prisma.like.findMany({
//       where: { user_id: userId },
//       include: {
//         spot: true,
//       },
//     });
//     res.json(likes);
//   } catch (error) {
//     console.error("Erreur Prisma :", error);
//     res.status(500).json({
//       error: "Erreur serveur lors de la récupération des likes.",
//     });
//   }
// });

// POST
router.post("/", async (req, res) => {
  try {
    const { user_id, spot_id } = req.body;

    // création du like
    const like = await prisma.like.create({
      data: {
        user_id,
        spot_id,
      },
    });

    res.status(201).json(like);
  } catch (error) {
    console.error("Erreur Prisma :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la création du like.",
    });
  }
});

// DELETE : "de-liker" un like
router.delete("/:id", async (req, res) => {
  try {
    const likeId = parseInt(req.params.id);

    // Vérifie si le like existe avant de le supprimer
    const existingLike = await prisma.like.findUnique({
      where: { id: likeId },
    });

    if (!existingLike) {
      return res.status(404).json({ error: "Like non trouvé." });
    }

    // Suppression du like
    await prisma.like.delete({ where: { id: likeId } });

    res.status(200).json({
      message: `Like avec l'id ${likeId} supprimé avec succès.`,
    });
  } catch (error) {
    console.error("Erreur lors de la suppression du like :", error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la suppression du like." });
  }
});

export default router;
