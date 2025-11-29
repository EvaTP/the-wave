import { Router } from "express";
import { prisma } from "./../lib/prisma.js";

const router = Router();

// IMPORTANT : Les routes spécifiques AVANT les routes avec paramètres dynamiques

// GET all spots
router.get("/", async (req, res) => {
  console.log("route spots get appelée");
  console.log("origin : ", req.headers.origin);
  try {
    const spots = await prisma.spot.findMany({
      include: {
        spot_levels: {
          include: {
            level: true,
          },
        },
        comments: true,
        likes: true,
      },
    });

    res.json(spots);
  } catch (error) {
    console.error("Erreur Prisma :", error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la récupération des spots." });
  }
});

// --------------------------
// ROUTE LÉGÈRE POUR LA MAP
// --------------------------
// GET /spots/map → version légère optimisée pour la carte. Doit être avant le GET /spots/:id
router.get("/map", async (req, res) => {
  console.log("🌴 Route /spots/map appelée");
  try {
    // Récupérer uniquement les champs nécessaires pour la carte
    const spots = await prisma.spot.findMany({
      select: {
        id: true,
        name: true,
        country_spot: true,
        lat: true,
        lng: true,
        spot_levels: {
          select: {
            level: {
              select: {
                label: true,
              },
            },
          },
        },
      },
    });

    // formatter les données (gestion des Decimal de Prisma)
    const formatted = spots.map((spot) => ({
      id: spot.id,
      name: spot.name,
      country_spot: spot.country_spot,
      lat: spot.lat ? parseFloat(spot.lat) : null, // Convertir Decimal en Number
      lng: spot.lng ? parseFloat(spot.lng) : null,
      // Si spot_levels est vide, renvoyer chaîne vide pour level
      level: spot.spot_levels?.length
        ? spot.spot_levels.map((sl) => sl.level.label).join(", ")
        : "",
    }));
    console.log(`✅ ${formatted.length} spots récupérés pour la carte`);
    res.json(formatted);
  } catch (error) {
    console.error("Erreur Prisma /spots/map :", error);
    console.error("Stack trace:", error.stack); // ⭐ Log détaillé
    res.status(500).json({
      error: "Erreur serveur lors de la récupération des spots (map).",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// GET HASHTAGS FOR A SPOT BY SPOT ID (http://localhost:3001/spots/15/hashtags)
router.get("/:id/hashtags", async (req, res) => {
  try {
    const spotId = parseInt(req.params.id);

    const spotHashtags = await prisma.spot_hashtag.findMany({
      where: { spot_id: spotId },
      include: {
        hashtag: true, // récupère l'objet hashtag lié
      },
    });

    // Ne renvoyer que les hashtags, pas les relations complètes
    const hashtags = spotHashtags.map((sh) => sh.hashtag);
    res.json(hashtags);
  } catch (error) {
    console.error("Erreur Prisma hashtags :", error);
    res.status(500).json({
      error:
        "Erreur serveur lors de la récupération des hashtags pour ce spot.",
    });
  }
});

// GET COMMENTS FOR A SPOT BY SPOT ID (http://localhost:3001/spots/15/comments)
router.get("/:id/comments", async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { spot_id: parseInt(req.params.id) },
      include: {
        user: true,
      },
    });
    res.json(comments);
  } catch (error) {
    console.error("Erreur Prisma :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la récupération des commentaires.",
    });
  }
});

// GET SPOTS BY ID (toujours en dernier après les GET spécifiques).(http://localhost:3001/spots/15)
router.get("/:id", async (req, res) => {
  console.log("route spots get appelée");
  console.log("origin : ", req.headers.origin);
  try {
    const spots = await prisma.spot.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        spot_levels: {
          include: {
            level: true,
          },
        },
        comments: true,
        likes: true,
      },
    });
    res.json(spots);
  } catch (error) {
    console.error("Erreur Prisma :", error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la récupération du spot/id." });
  }
});

// POST un nouveau spot
router.post("/", async (req, res) => {
  try {
    const {
      name,
      country_spot,
      lat,
      lng,
      url_spotpicture,
      description,
      best_season,
      wave_type,
      tide,
      water_temperature,
      crowd,
      dangers = [],
      facilities = [],
      levels = [],
    } = req.body;

    // création du spot
    const spot = await prisma.spot.create({
      data: {
        name,
        country_spot,
        lat,
        lng,
        url_spotpicture,
        description,
        best_season,
        wave_type,
        tide,
        water_temperature,
        crowd,
        dangers,
        facilities,
      },
    });

    // Création des relations avec les niveaux
    for (const levelId of levels) {
      await prisma.spot_level.create({
        data: {
          spot_id: spot.id,
          level_id: levelId,
        },
      });
    }

    res.status(201).json(spot);
  } catch (error) {
    console.error("Erreur lors de la création du spot :", error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la création du spot." });
  }
});

// POST un nouveau commentaire pour un spot
router.post("/:id/comments", async (req, res) => {
  try {
    const spotId = parseInt(req.params.id);

    const {
      name,
      country_spot,
      lat,
      lng,
      url_spotpicture,
      description,
      best_season,
      wave_type,
      tide,
      water_temperature,
      crowd,
      dangers,
      facilities,
      levels,
    } = req.body;

    // mettre à jour le spot
    const updatedSpot = await prisma.spot.update({
      where: { id: spotId },
      data: {
        name,
        country_spot,
        lat,
        lng,
        url_spotpicture,
        description,
        best_season,
        wave_type,
        tide,
        water_temperature,
        crowd,
        dangers,
        facilities,
        updated_at: new Date(),
      },
    });

    // Si des niveaux sont fournis, mettre à jour les relations
    if (Array.isArray(levels)) {
      // Supprimer les relations existantes
      await prisma.spot_level.deleteMany({ where: { spot_id: spotId } });

      // Créer les nouvelles relations
      for (const levelId of levels) {
        await prisma.spot_level.create({
          data: {
            spot_id: spotId,
            level_id: levelId,
          },
        });
      }
    }

    res.status(200).json(updatedSpot);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du spot (PATCH) :", error);
    res.status(500).json({ error: "Erreur serveur lors de la mise à jour." });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const spotId = parseInt(req.params.id);

    // Vérifie si le post existe avant de le supprimer
    const existingSpot = await prisma.spot.findUnique({
      where: { id: spotId },
    });

    if (!existingSpot) {
      return res.status(404).json({ error: "Spot non trouvé." });
    }

    // Supprimer les relations avec les niveaux avant de supprimer le spot
    await prisma.spot_level.deleteMany({ where: { spot_id: spotId } });

    // Suppression du spot
    await prisma.spot.delete({
      where: { id: spotId },
    });

    res
      .status(200)
      .json({ message: `Spot avec l'id ${spotId} supprimé avec succès.` });
  } catch (error) {
    console.error("Erreur lors de la suppression du spot :", error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la suppression du spot." });
  }
});

export default router;
// module.exports = router;  ancienne syntaxe CommonJS
