// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const { PrismaClient } = require("@prisma/client");

// adaptation des imports pour ESM (ES Modules):
import "dotenv/config";
import express from "express";
import cors from "cors";
// import { prisma } from "./lib/prisma.js";

import authRoutes from "./routes/auth.js";
import spotsRoutes from "./routes/spots.js";
import usersRoutes from "./routes/users.js";
import commentsRoutes from "./routes/comments.js";
import likesRoutes from "./routes/likes.js";
import hashtagsRoutes from "./routes/hashtags.js";
import adminRoutes from "./routes/admin.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares (ils doivent être avant les routes)
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json()); // pour parser le JSON

// Utiliser les routes (après les middlewares et avant le app.listen)
app.use("/auth", authRoutes);
app.use("/spots", spotsRoutes);
app.use("/users", usersRoutes);
app.use("/comments", commentsRoutes);
app.use("/likes", likesRoutes);
app.use("/hashtags", hashtagsRoutes);
app.use("/admin", adminRoutes);

// Route de test
app.get("/", (req, res) => {
  res.json({ message: "API The Wave is running! 🚀" });
});

// Route test base de données
app.get("/test-db", async (req, res) => {
  try {
    const spots = await prisma.spot.findMany();
    res.json({ success: true, spots });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Démarrer le serveur (le app.listen doit être à la fin du fichier)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
