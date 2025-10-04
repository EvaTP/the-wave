import { Router } from "express";
import { prisma } from "./../lib/prisma.js";

const router = Router();

// GET tous les hashtags
router.get("/", async (req, res) => {
  try {
    const spotHashtags = await prisma.spot_hashtag.findMany({
      include: {
        spot: true,
        hashtag: true,
      },
    });
    res.json(spotHashtags);
  } catch (error) {
    console.error("Erreur Prisma :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la récupération des hashtags.",
    });
  }
});

// GET BY SPOT ID → tous les hashtags d’un spot donné
// GET hashtags d'un spot donné
router.get("/spot/:spotId", async (req, res) => {
  try {
    const spotId = parseInt(req.params.spotId);

    const spotHashtags = await prisma.spot_hashtag.findMany({
      where: { spot_id: spotId },
      include: {
        hashtag: true, // récupère l'objet hashtag lié
      },
    });

    // ne renvoyer que les hashtags, pas les relations complètes
    const hashtags = spotHashtags.map((sh) => sh.hashtag);

    res.json(hashtags);
  } catch (error) {
    console.error("Erreur Prisma :", error);
    res.status(500).json({
      error:
        "Erreur serveur lors de la récupération des hashtags pour ce spot.",
    });
  }
});

// GET BY ID
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const hashtag = await prisma.hashtag.findUnique({
      where: { id },
      include: {
        spots: {
          include: {
            spot: true, // pour aussi ramener les spots liés
          },
        },
      },
    });

    if (!hashtag) {
      return res.status(404).json({ error: `Hashtag ${id} introuvable.` });
    }

    res.json(hashtag);
  } catch (error) {
    console.error("Erreur Prisma :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la récupération du hashtag.",
    });
  }
});

// POST : associer un hashtag à un spot
router.post("/", async (req, res) => {
  try {
    const { spot_id, hashtag_id } = req.body;

    // création du hashtag
    const spotHashtag = await prisma.spot_hashtag.create({
      data: {
        spot_id,
        hashtag_id,
      },
    });

    res.status(201).json(spotHashtag);
  } catch (error) {
    console.error("Erreur lors de la création du hashtag :", error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la création du spot_hashtag." });
  }
});

// modification partielle (PATCH)
router.patch("/:id", async (req, res) => {
  try {
    const spotHashtagId = parseInt(req.params.id);
    const { spot_id, hashtag_id } = req.body;

    const updatedSpotHashtag = await prisma.spot_hashtag.update({
      where: { id: spotHashtagId },
      data: {
        spot_id,
        hashtag_id,
      },
    });

    res.status(200).json(updatedSpotHashtag);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du spot_hashtag :", error);
    res.status(500).json({ error: "Erreur serveur lors de la mise à jour." });
  }
});

// DELETE : supprimer un hashtag
router.delete("/:id", async (req, res) => {
  try {
    const spotHashtagId = parseInt(req.params.id);

    // Vérifie si le hashtag existe avant de le supprimer
    const existingHashtag = await prisma.spot_hashtag.findUnique({
      where: { id: spotHashtagId },
    });

    if (!existingHashtag) {
      return res.status(404).json({ error: "spot_hashtag non trouvé." });
    }

    // Suppression du hashtag
    await prisma.spot_hashtag.delete({ where: { id: spotHashtagId } });

    res.status(200).json({
      message: `spot_hashtag avec l'id ${spotHashtagId} supprimé avec succès.`,
    });
  } catch (error) {
    console.error("Erreur lors de la suppression du spot_hashtag :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la suppression du spot_hashtag.",
    });
  }
});

export default router;
