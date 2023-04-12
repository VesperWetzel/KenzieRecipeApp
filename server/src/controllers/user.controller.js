import User from "../models/user.model";

export const favoriteRecipe = async (req, res) => {
  const { userId, recipeId, title, image } = req.body;
  const user = await User.findOne({ _id: userId });
  if (user) {
    if (!user.favorites.find(f => f.recipeId === recipeId)) {
      user.favorites.push({ recipeId, title, image });
      await User.updateOne({ _id: userId }, user);
    }
  }
  return res.status(200).json({
    email: user.email,
    favorites: user.favorites,
    uid: user._id
  });
}

export const unfavoriteRecipe = async (req, res) => {
  const { userId, recipeId } = req.body;
  const user = await User.findOne({ _id: userId });
  if (user) {
    const index = user.favorites.findIndex(f => f.recipeId === recipeId);
    if (index > -1) {
      user.favorites.splice(index, 1);
      await User.updateOne({ _id: userId }, user);
    }
  }
  return res.status(200).json({
    email: user.email,
    favorites: user.favorites,
    uid: user._id
  });
}