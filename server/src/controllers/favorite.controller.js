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

export const getFavorites = async (req, res) => {
    const {userId } = req.body;
    const favorites = await Favorite.find({userId})
    const recipeIDs = favorites.map(f=>{
        return f.recipeId
    })
    return res.status(200).json(recipeIDs)

}

export const unfavoriteHandler = async (req, res) => {
    const { userId, recipeId } = req.body;
    const recipeFavorite = await Favorite.findOne({ userId, recipeId });
    console.log(recipeFavorite)
    if(recipeFavorite) {
       await Favorite.deleteOne({_id: recipeFavorite._id})
    }
    return res.status(200).json({})
}
