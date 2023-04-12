import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import spoonacular from "../services/spoonacular";
import "../App.css";
import api from "../services/api";
import "./RecipePage.css"
import recipes from "../services/recipes";
import user from "../services/user";


const RecipePage = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const [favorited, setFavorited] = useState(false)
  useEffect(() => {
    (async () => {
      const response = await spoonacular.fetchRecipe(id);
      setRecipe(response);
      setFavorited(user.checkFavorite(id));
      api.putRecipe(response);
    })();
  }, []);

  async function toggleFavorite() {
    if (favorited) {
      await user.unfavoriteRecipe(recipe.id);
    }
    else {
      await user.favoriteRecipe(recipe);
    }
    setFavorited(!favorited);
  }

  return (
    <div>
      {recipe ? (
        <div >
          <h1>{recipe.title}</h1>
          <img src={recipe.image} />
          <div>Servings: {recipe.servings}</div>
          <button onClick={toggleFavorite}>{favorited ? "Unfavorite" : "Favorite"} </button>
          <div className="recipediv">
            <ul>
              {recipe.extendedIngredients.map((i, x) => {
                return <li key={x}>{i.name}</li>;
              })}
            </ul>
          </div>
          <div>
            Directions:  {recipe.instructions}
          </div>
        </div>
      ) : (
        <p> No recipe found. </p>
      )}
    </div>
  );
};

export default RecipePage;
