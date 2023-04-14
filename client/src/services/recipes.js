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

  async query(query) {
    return await api.queryRecipes(query);
  }
}

export default new Recipes();
