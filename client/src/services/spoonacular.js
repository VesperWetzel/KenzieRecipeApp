import HTTP from "./HTTP";

class Spoonacular {
  apiKey = "472db86acc7645a190310725bc749cae";
  rootURL = "https://api.spoonacular.com";
  async searchRecipes(ingredients) {
    const URL = this.constructURL(
      "recipes/complexSearch",
      `includeIngredients=${ingredients}`
    );
    return await HTTP.get(URL);
  }

  constructURL(path, params) {
    return `${this.rootURL}/${path}?apiKey=${this.apiKey}${
      params ? "&" + params : ""
    }`;
  } //FUnction that returns a URL where the path and Url's are different. Reduces redundant code.

  async fetchRecipe(id) {
    const URL = this.constructURL(
      `recipes/${id}/information`,
      "includenutrition=false"
    );
    return await HTTP.get(URL)
  }
  
}

export default new Spoonacular();
