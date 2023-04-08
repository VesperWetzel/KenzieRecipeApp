import {
  Container,
  Button,
  Form,
  Badge,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import "./LandingPage.css";
import { useState } from "react";
import spoonacular from "../services/spoonacular";
import recipes from "../services/recipes";
import storage from "../services/storage";
import { useNavigate } from "react-router-dom";
import "../App.css"

const LandingPage = () => {
  const navigate = useNavigate();
  const cached = storage.getSearchResults();
  const [ingredients, setIngredients] = useState(cached?.ingredients || []);
  const [searching, setSearching] = useState(false);
  const [searchedRecipes, setSearchedRecipes] = useState(cached?.recipes || []);
  function onSubmit(e) {
    e.preventDefault();
    //data is coming through as 1 string
    let textBoxInfo = e.target[0]; //e.target is the form. [0] is the first element in the form which is the textbox.
    let newIngredients = ingredients.concat(textBoxInfo.value);
    setIngredients(newIngredients);
    textBoxInfo.value = ""; //resets text box value to nothing so that we don't add a chunk of ingredients and they aree aier to remove if needed.
    console.log("ingredients", newIngredients);
  }

  function deleteIngredient(x) {
    //x ix the index here as i is for ingredient
    let splicedIngredients = [...ingredients];
    splicedIngredients.splice(x, 1);
    setIngredients(splicedIngredients);
  }

  async function search() {
    setSearching(true);

    const results = await recipes.searchRecipes(ingredients);
    setSearchedRecipes(results);
    setSearching(false);
    console.log(results);
  }

  function renderSpinner() {
    //stops spinner from spinning when not actually searching
    if (searching === true) {
      return (
        <Spinner
          className="spinner"
          size="sm"
          animation="border"
          variant="info"
        />
      );
    }
  }

  function renderSearch() {
    //creates search button to compare to recipe API
    if (ingredients.length) {
      return (
        <div>
          <Button className="searchButton" variant="primary" onClick={search}>
            {renderSpinner()}
            Search
          </Button>
          <Button className="reset" variant="primary" onClick={reset}>
            Reset
          </Button>
        </div>
      );
    }
  }

  function renderRecipes() {
    if (searchedRecipes.length) {
      return (
        <Container>
          <Row xs={2} md={2} lg={4}>
            {searchedRecipes.map((i, x) => {
              return (
                <Col key={i.id}>
                  {i.title} <br />
                  <img
                    src={i.image}
                    onClick={() => {
                      displayRecipe(i.id);
                    }}
                  />
                </Col>
              );
            })}
          </Row>
        </Container>
      );
    }
  }

  function reset() {
    setIngredients([]);
    setSearchedRecipes([]);
  }

  function displayRecipe(id) {
    console.log(id);
    navigate(`recipe/${id}`);
  }

  return (
    <div className="background">
  <Container>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Please Input Ingredients One At A Time</Form.Label>
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
      {renderRecipes()}
    </Container>
</div>
  );
};

export default LandingPage;
