import { Router } from "express";
import { loginClub, register } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", loginClub);
router.post("/register", register);

export default router;
