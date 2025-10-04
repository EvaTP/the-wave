// gestion de l'authentification, login, logout, token JWT
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
// import { authorizeRole } from "../middleware/authorizeRole.js";

const router = Router();

// Clé secrète JWT (à mettre dans .env)
const JWT_SECRET = process.env.JWT_SECRET || "votre-cle-secrete-super-longue";
const JWT_EXPIRES_IN = "1d"; // Token valide 1 jour

// POST /auth/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation des données
    if (!username || !password) {
      return res.status(400).json({
        error: "Username and password required",
      });
    }

    // Chercher l'utilisateur en base (avec le rôle)
    const user = await prisma.user.findUnique({
      where: { username },
      include: { role: true },
    });

    if (!user) {
      return res.status(401).json({
        error: "Invalid IDs",
      });
    }

    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        error: "Invalid IDs",
      });
    }

    // Créer le token JWT
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        roleId: user.role_id,
        role: user.role.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Retourner les infos utilisateur (sans le mot de passe) et le token
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: "Connexion réussie",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error("Erreur login:", error);
    res.status(500).json({
      error: "Erreur serveur lors de la connexion",
    });
  }
});

// POST /auth/logout (optionnel - côté client seulement avec JWT)
router.post("/logout", (req, res) => {
  // Avec JWT, le logout se fait côté client en supprimant le token
  res.json({
    success: true,
    message: "Déconnexion réussie",
  });
});

// GET /auth/me - Vérifier si l'utilisateur est connecté
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        username: true,
        email: true,
        country_user: true,
        url_userpicture: true,
        role_id: true,
        role: {
          select: {
            id: true,
            role: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Erreur get user:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
