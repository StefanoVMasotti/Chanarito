import express from "express";
import cors from "cors";
import clubsRoutes from "./routes/clubs.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/clubs", clubsRoutes);

export default app;
