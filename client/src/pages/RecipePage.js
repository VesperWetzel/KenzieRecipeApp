import { useState} from "react";
import { useParams } from "react-router-dom";
import spoonacular from "../services/spoonacular";
//import { useNavigate } from 'react-router-dom';



const RecipePage = async () => {
    const [recipe, setRecipe] = useState([])
    const { id } = useParams();
    const response = await spoonacular.fetchRecipe(id)
    console.log(response)
  return (
    <div>RecipePage</div>
  )
};

export default RecipePage;