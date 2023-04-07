import { Router } from "express";
import { favoriteHandler } from "../controllers/favorite.controller";

const router = Router();

router.post("/favorite", favoriteHandler)

export default router;