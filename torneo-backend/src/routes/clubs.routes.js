import { Router } from "express";
import {
  createClub,
  getClubs,
  getClubById,
  updateClub,
  deleteClub,
} from "../controllers/clubs.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";

const router = Router();

router.post("/", createClub);

router.get("/", verifyToken, getClubs);

router.get("/:id", verifyToken, getClubById);

router.put("/:id", verifyToken, updateClub);

router.delete("/:id", verifyToken, isAdmin, deleteClub);

export default router;
