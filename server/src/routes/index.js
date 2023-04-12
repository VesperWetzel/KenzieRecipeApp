import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import recipeRoutes from "./recipe.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/recipes", recipeRoutes);

export default router;
