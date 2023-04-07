import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import spoonacular from "../services/spoonacular";
//import { useNavigate } from 'react-router-dom';

const RecipePage = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const response = await spoonacular.fetchRecipe(id);
      setRecipe(response);
    })();
  }, []);

  console.log(recipe);

  return (
    <div>
      {recipe ? (
        <div>
          <h1>{recipe.title}</h1>
          <img src={recipe.image} />
          <div>Servings: {recipe.servings}</div>
          <div>
            <ul>
              {recipe.extendedIngredients.map((i) => {
                return <li>{i.name}</li>;
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
