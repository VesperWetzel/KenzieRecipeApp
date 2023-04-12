import Recipe from "../models/recipe.model";

export const putRecipe = async (req, res) => {
    const recipe = req.body;
    const existing = await Recipe.findOne({ recipeId: recipe.recipeId });
    if (!existing) {
        const newRecipe = new Recipe({
            recipeId: recipe.recipeId,
            title: recipe.title,
            image: recipe.image
        });
        await newRecipe.save();
    }
    return res.status(200).json();
};

export const searchRecipes = async (req, res) => {
    const { query } = req.body;
    const recipes = await Recipe.find({ title: { $regex: `.*${query}.*`, $options: 'i' } });
    return res.status(200).json(recipes);
};
