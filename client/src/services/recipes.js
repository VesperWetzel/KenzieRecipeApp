import storage from "./storage";
import spoonacular from "./spoonacular";
import api from "./api";

class Recipes {
  /*1. Check if the search results are already in storage 
2. If it's not in storage, fetch from the API 
3. If it wasn't in storage, store it. 
4. Return whatever you get 
*/
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
    const favorites = JSON.parse(sessionStorage.getItem("favorites"));
    return favorites.includes(recipeId)
  }
  async updatedFavorited(recipeId, shouldFavorite) {
    const method = shouldFavorite ? "favorite" : "unfavorite";
    await api[method](recipeId)
    const favorites = JSON.parse(sessionStorage.getItem("favorites"));
    if(shouldFavorite){
      favorites.push(recipeId)
    }else {
      const index = favorites.indexOf(recipeId)
      favorites.splice(index, 1)
    }
  }
}

export default new Recipes();
