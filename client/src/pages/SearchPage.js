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
import "../App.css";

const SearchPage = () => {
  const navigate = useNavigate();
  const [searching, setSearching] = useState(false);
  const [searchedRecipes, setSearchedRecipes] = useState([]);

  async function onSubmit(e) {
    e.preventDefault();
    let textBoxInfo = e.target[0];
    const query = textBoxInfo.value;
    setSearching(true);
    const results = await recipes.query(query);
    setSearchedRecipes(results);
    console.log(results);
  }

  function renderRecipes() {
    if (searchedRecipes.length) {
      return (
        <Container>
          <Row xs={2} md={2} lg={4}>
            {searchedRecipes.map((i, x) => {
              return (
                <Col key={i.recipeId}>
                  {i.title} <br />
                  <img
                    src={i.image}
                    onClick={() => {
                      displayRecipe(i.recipeId);
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

  function displayRecipe(id) {
    console.log(id);
    navigate(`/recipe/${id}`);
  }

  return (
    <div className="background">
      <Container>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Enter a search term" />
          </Form.Group>
        </Form>

        {renderRecipes()}
      </Container>
    </div>
  );
};

export default SearchPage;
