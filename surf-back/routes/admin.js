import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { authorizeRole } from "../middleware/authorizeRole.js";

const router = Router();

// Page admin réservée aux admins et moderators
router.get(
  "/",
  authenticateToken,
  authorizeRole("admin", "moderator"),
  (req, res) => {
    res.json({ message: "Bienvenue sur la page admin 👑" });
  }
);

export default router;
