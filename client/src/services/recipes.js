import storage from "./storage";
import spoonacular from "./spoonacular";

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
}

export default new Recipes();
