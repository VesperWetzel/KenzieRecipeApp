class Spoonacular {
    apiKey = "472db86acc7645a190310725bc749cae"
    rootURL = "https://api.spoonacular.com"
    async searchRecipes(ingredients) {
        const url = `${this.rootURL}/recipes/complexSearch?apiKey=${this.apiKey}&includeIngredients=${ingredients}`
        const response = await fetch(url)
        return await response.json()
    }
}

export default new Spoonacular();