import { Router } from "express";
import { prisma } from "./../lib/prisma.js";
import bcrypt from "bcrypt";

const router = Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { role: true, comments: true, likes: true },
    });
    res.json(users);
  } catch (error) {
    console.error("Erreur Prisma :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la récupération des utilisateurs.",
    });
  }
});

// GET USERS BY ID
router.get("/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { role: true, comments: true, likes: true },
    });
    res.json(user);
  } catch (error) {
    console.error("Erreur Prisma :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la récupération de l'utilisateur.",
    });
  }
});

// POST
router.post("/", async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      username,
      country_user,
      email,
      password,
      url_userpicture,
    } = req.body;

    // hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // récupération du rôle "user" par défaut
    const userRole = await prisma.role.findUnique({
      where: { role: "user" },
    });

    if (!userRole) {
      return res.status(500).json({ error: "Rôle par défaut introuvable." });
    }

    // création de l'utilisateur
    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        username,
        country_user,
        email,
        password: hashedPassword,
        url_userpicture,
        role_id: userRole.id, // on donne le rôle "user" par défaut
      },
    });

    // ne pas renvoyer le mot de passe dans la réponse
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la création de l'utilisateur." });
  }
});

// modification partielle (PATCH)
router.patch("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const {
      firstname,
      lastname,
      username,
      country_user,
      email,
      password,
      url_userpicture,
      role_id,
    } = req.body;

    // mettre à jour l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstname,
        lastname,
        username,
        country_user,
        email,
        password,
        url_userpicture,
        role_id,
        updated_at: new Date(),
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour de l'utilisateur (PATCH) :",
      error
    );
    res.status(500).json({ error: "Erreur serveur lors de la mise à jour." });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    // Vérifie si l'utilisateur existe avant de le supprimer
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }
    // Suppression de l'utilisateur
    await prisma.user.delete({
      where: { id: userId },
    });

    res.status(200).json({
      message: `Utilisateur avec l'id ${userId} supprimé avec succès.`,
    });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    res.status(500).json({
      error: "Erreur serveur lors de la suppression de l'utilisateur.",
    });
  }
});

export default router;
