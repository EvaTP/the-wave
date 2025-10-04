import { Router } from "express";
import { prisma } from "./../lib/prisma.js";

const router = Router();

// GET
router.get("/", async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        user: true,
        spot: true,
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

// GET BY ID
router.get("/:id", async (req, res) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(req.params.id) },
      // include: {
      //   user: true,
      //   spot: true,
      // },
    });
    res.json(comment);
  } catch (error) {
    console.error("Erreur Prisma :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la récupération du commentaire.",
    });
  }
});

// POST
router.post("/", async (req, res) => {
  try {
    const { content, user_id, spot_id } = req.body;

    // création du commentaire
    const comment = await prisma.comment.create({
      data: {
        content,
        user_id,
        spot_id,
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error("Erreur lors de la création du commentaire :", error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la création du commentaire." });
  }
});

// modification partielle (PATCH)
router.patch("/:id", async (req, res) => {
  try {
    const commentId = parseInt(req.params.id);
    const { content, user_id, spot_id } = req.body;

    // mettre à jour le commentaire
    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: {
        content,
        user_id,
        spot_id,
        updated_at: new Date(),
      },
    });

    res.status(200).json(updatedComment);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du commentaire :", error);
    res.status(500).json({ error: "Erreur serveur lors de la mise à jour." });
  }
});

// DELETE : supprimer un commentaire
router.delete("/:id", async (req, res) => {
  try {
    const commentId = parseInt(req.params.id);

    // Vérifie si le commentaire existe avant de le supprimer
    const existingComment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!existingComment) {
      return res.status(404).json({ error: "Commentaire non trouvé." });
    }

    // Suppression du commentaire
    await prisma.comment.delete({ where: { id: commentId } });

    res.status(200).json({
      message: `Commentaire avec l'id ${commentId} supprimé avec succès.`,
    });
  } catch (error) {
    console.error("Erreur lors de la suppression du commentaire :", error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la suppression du commentaire." });
  }
});

export default router;
