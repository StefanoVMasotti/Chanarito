import express from "express";
import cors from "cors";
import clubsRoutes from "./routes/clubs.routes.js";
import authRoutes from "./routes/auth.routes.js";
import registrationsRoutes from "./routes/registrations.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";

const app = express();

app.use(
  cors({
    origin: "https://tu-frontend.vercel.app",
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/clubs", clubsRoutes);
app.use("/api/registrations", registrationsRoutes);
app.use("/api/categories", categoriesRoutes);

export default app;
