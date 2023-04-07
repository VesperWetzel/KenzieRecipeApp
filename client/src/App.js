import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components";
import useAuth from "./hooks/useAuth";
import { FavoriteRecipes, LandingPage, LoginPage, RegisterPage, RecipePage  } from "./pages";


function App() {
 const { isAuthenticated } = useAuth();
  return (
    <>
      <Header/>
      {isAuthenticated ? (
        <Routes>
          <Route path="" element={<LandingPage />} />
          <Route path="signin" element={<LoginPage />} />
          <Route path="signup" element={<RegisterPage />} />
          <Route path="recipe/:id" element={<RecipePage />} />
          {/* <Route path="favorite" element={<FavoriteRecipes />} /> */}
        </Routes>
      ) : (
        <Routes>
          <Route path="" element={<LandingPage />} />
          <Route path="signin" element={<LoginPage />} />
          <Route path="signup" element={<RegisterPage />} />
          <Route path="recipe/:id" element={<RecipePage />} />
          {/* <Route path="favorite" element={<FavoriteRecipes />} /> */}
        </Routes>
      )}
    </>
  );
}

export default App;
