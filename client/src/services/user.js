import api from "./api";

class UserService {
    getId() {
        return this.get().uid;
    }

    checkFavorite(recipeId) {
        return !!this.get()?.favorites.find(f => f.recipeId === recipeId);
    }

    async favoriteRecipe(recipe) {
        const user = await api.favoriteRecipe(this.getId(), recipe);
        this.store(user);
    }

    async unfavoriteRecipe(recipeId) {
        const user = await api.unfavoriteRecipe(this.getId(), recipeId);
        this.store(user);
    }

    getFavoriteRecipes() {
        return this.get()?.favorites;
    }

    getStored() {
        return JSON.parse(sessionStorage.getItem("CSUser"));
    }

    get() {
        return this.getStored()?.user;
    }

    store(user) {
        const stored = this.getStored();
        stored.user = user;
        sessionStorage.setItem("CSUser", JSON.stringify(stored));
    }
}
export default new UserService();