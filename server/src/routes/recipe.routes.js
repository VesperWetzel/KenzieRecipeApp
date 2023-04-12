import { Router } from "express";
import { putRecipe, searchRecipes } from "../controllers/recipe.controller";

const router = Router();

router.post("/", putRecipe);
router.post("/search", searchRecipes);

export default router;