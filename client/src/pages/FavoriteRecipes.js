import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import recipes from "../services/recipes";
import { useNavigate } from "react-router-dom";
import user from "../services/user";

const FavoriteRecipes = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    (async () => {
      setFavorites(user.getFavoriteRecipes());
    })();
  }, []);

  function displayRecipe(id) {
    navigate(`/recipe/${id}`);
  }

  return (
    <Container>
      <Row xs={2} md={2} lg={4}>
        {favorites.map((f, x) => {
          return (
            <Col key={x}>
              {f.title} <br />
              <img
                style={{maxHeight: '200px'}}
                src={f.image}
                onClick={() => {
                  displayRecipe(f.recipeId);
                }}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default FavoriteRecipes;