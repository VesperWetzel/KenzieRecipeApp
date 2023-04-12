import storage from "./storage";
import spoonacular from "./spoonacular";
import api from "./api";

class Recipes {
  async searchRecipes(ingredients) {
    const query = ingredients.join(",");
    let fetchSearchResults = await spoonacular.searchRecipes(query);
    storage.setSearchResults({
      recipes: fetchSearchResults.results,
      ingredients,
    });
    return fetchSearchResults.results;
  }

  checkFavorite(recipeId) {
    const favorites = this.getFavorites();
    return !!favorites.find(f => f.recipeId === recipeId);
  }

  async toggleFavorite(recipe) {
    const recipeId = recipe.id.toString();
    const favorites = this.getFavorites();
    const index = favorites.findIndex(f => f.recipeId === recipeId);
    if (index > -1){
      await api.unfavoriteRecipe(recipeId);
      favorites.splice(index, 1);
    } else {
      const favorite = await api.favoriteRecipe(recipe);
      favorites.push(favorite);
    }
    sessionStorage.setItem("favorites", JSON.stringify(favorites))
  }

  getFavorites() {
    return JSON.parse(sessionStorage.getItem('favorites'));
  }

  async query(query) {
    return await api.queryRecipes(query);
  }
}

export default new Recipes();
