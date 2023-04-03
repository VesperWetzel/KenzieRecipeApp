import { Container, Button, Form, Badge, Spinner } from "react-bootstrap";
import "./LandingPage.css";
import { useState } from "react";
import spoonacular from "../services/spoonacular";

const initialState = {
  ingredients: [],
};

const LandingPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [searching, setSearching] =useState(false)
  function onSubmit(e) {
    e.preventDefault();
    //data is coming through as 1 string
    let textBoxInfo = e.target[0]; //e.target is the form. [0] is the first element in the form which is the textbox.
    let newIngredients = ingredients.concat(textBoxInfo.value);
    setIngredients(newIngredients);
    textBoxInfo.value = ""; //resets text box value to nothing so that we don't add a chunk of ingredients and they aree aier to remove if needed.
    console.log("ingredients", newIngredients);
  }

  function deleteIngredient(x) { //x ix the index here as i is for ingredient
    let splicedIngredients = [...ingredients];
    splicedIngredients.splice(x, 1);
    setIngredients(splicedIngredients);
  }

  async function search() {
    setSearching(true)
    const query = ingredients.join(",")
    const recipes = await spoonacular.searchRecipes(query)
    setSearching(false)
    console.log(recipes)
  }

  function renderSpinner() {//stops spinner from spinning when not actually searching
    if(searching === true){
      return <Spinner className="spinner"size="sm" animation="border" variant="info" />
    }
  }

  function renderSearch() {//creates search button to compare to recipe API
    if (ingredients.length) {
      return <Button className="searchButton" variant="primary" onClick={search} > 
      {renderSpinner()}
      Search
      </Button>
    }
  }






  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Ingredients</Form.Label>
          <Form.Control type="text" placeholder="What's for dinner?" />
          <Form.Text className="description">
            Enter the ingredients you'd like to cook with.
          </Form.Text>
        </Form.Group>
      </Form>

      {ingredients.map((i, x) => {
        return (
          <Button key={x} variant="primary" onClick={() => deleteIngredient(x)}>
            {i} <Badge bg="secondary">x</Badge>
          </Button>
        );
      })}

      {renderSearch()}
    </Container>
  );
};

export default LandingPage;
