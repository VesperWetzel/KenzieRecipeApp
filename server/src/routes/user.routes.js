import { Router } from "express";
import { favoriteRecipe, unfavoriteRecipe } from "../controllers/user.controller";

const router = Router();

router.post("/favorite", favoriteRecipe);
router.post("/unfavorite", unfavoriteRecipe);

export default router;
