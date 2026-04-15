import { Router } from "express";
import { loginClub } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", loginClub);

export default router;
