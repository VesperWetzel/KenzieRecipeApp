import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components";
import useAuth from "./hooks/useAuth";
import {
  FavoriteRecipes,
  LandingPage,
  LoginPage,
  RegisterPage,
  RecipePage,
} from "./pages";
import SearchPage from "./pages/SearchPage";


function App() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <Header className="header"/>

      {isAuthenticated ? (
        <Routes >
          <Route path="" element={<LandingPage />} />
          <Route path="signin" element={<LoginPage />} />
          <Route path="signup" element={<RegisterPage />} />
          <Route path="recipe/:id" element={<RecipePage />} />
          <Route path="favorites" element={<FavoriteRecipes />} />
          <Route path="search" element={<SearchPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="" element={<LandingPage />} />
          <Route path="signin" element={<LoginPage />} />
          <Route path="signup" element={<RegisterPage />} />
          <Route path="recipe/:id" element={<RecipePage />} />
          <Route path="search" element={<SearchPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
