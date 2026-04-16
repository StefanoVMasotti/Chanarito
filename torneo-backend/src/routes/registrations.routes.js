import { Router } from "express";
import { createRegistration } from "../controllers/registrations.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { getMyRegistrations } from "../controllers/registrations.controller.js";

const router = Router();

router.post("/", verifyToken, createRegistration);
router.get("/", verifyToken, getMyRegistrations);

export default router;
