import Favorite from "../models/favorite.model";

export const favoriteHandler = async (req, res) => {
    const { userId, recipeId } = req.body;
    const recipeFavorite = await Favorite.findOne({ userId, recipeId });
    if(!recipeFavorite) {
        let savedFavorite = new Favorite({userId, recipeId}) 
        await savedFavorite.save()
    }
    return res.status(200).json({})
}