import HTTP from "./HTTP";
import UserService from "./user";

class Api {
  rootURL = "http://localhost:3001/api";
    
  constructURL(path) {
    return `${this.rootURL}/${path}`;
  } 

  async favoriteRecipe(userId, recipe) {
    const URL = this.constructURL("users/favorite");
    const body = {
      userId,
      recipeId: recipe.id.toString(),
      title: recipe.title,
      image: recipe.image
    };
    return await HTTP.post(URL, body);
  }
  
  async unfavoriteRecipe(userId, recipeId) {
    const URL = this.constructURL("users/unfavorite");
    const body = {
      userId,
      recipeId: recipeId.toString()
    };
    return await HTTP.post(URL, body);
  }

  async queryRecipes(query) {
    const url = this.constructURL("recipes/search");
    const body = { query };
    return await HTTP.post(url, body);
  }

  async putRecipe(recipe) {
    const url = this.constructURL("recipes");
    const body = {
      recipeId: recipe.id.toString(),
      title: recipe.title,
      image: recipe.image
    };
    return await HTTP.post(url, body);
  }
}
  
export default new Api();