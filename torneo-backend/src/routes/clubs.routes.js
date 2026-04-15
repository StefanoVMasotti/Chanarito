import { Router } from "express";
import {
  createClub,
  getClubs,
  getClubById,
  updateClub,
  deleteClub,
} from "../controllers/clubs.controllers.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", createClub);

router.get("/", verifyToken, getClubs);

router.get("/:id", getClubById);

router.put("/:id", updateClub);

router.delete("/:id", deleteClub);

export default router;
