import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import favoriteRoutes from "./favorite.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/favorites", favoriteRoutes);

export default router;
