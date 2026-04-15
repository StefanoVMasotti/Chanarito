import { Router } from "express";
import {
  createClub,
  getClubs,
  getClubById,
  updateClub,
  deleteClub,
} from "../controllers/clubs.controllers.js";

const router = Router();

router.post("/", createClub);

router.get("/", getClubs);

router.get("/:id", getClubById);

router.put("/:id", updateClub);

router.delete("/:id", deleteClub);

export default router;
