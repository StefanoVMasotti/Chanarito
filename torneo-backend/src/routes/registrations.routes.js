import { Router } from "express";
import {
  createRegistration,
  getAllRegistrations,
  getMyRegistrations,
  deleteRegistration,
  deleteAnyRegistration,
} from "../controllers/registrations.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";

const router = Router();

router.post("/", verifyToken, createRegistration);
router.get("/", verifyToken, getMyRegistrations);
router.delete("/:id", verifyToken, deleteRegistration);
router.get("/all", verifyToken, isAdmin, getAllRegistrations);
router.delete("/admin/:id", verifyToken, isAdmin, deleteAnyRegistration);

export default router;
