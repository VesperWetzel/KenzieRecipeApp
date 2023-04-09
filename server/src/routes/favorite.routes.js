import { Router } from "express";
import { favoriteHandler, getFavorites, unfavoriteHandler } from "../controllers/favorite.controller";

const router = Router();

router.post("/favorite", favoriteHandler);
router.post("/getfavorites", getFavorites);
router.post("/unfavorite", unfavoriteHandler)

export default router;