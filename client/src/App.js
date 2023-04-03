import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components";
import useAuth from "./hooks/useAuth";
import { LandingPage, LoginPage, RegisterPage } from "./pages";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <Header />
      {isAuthenticated ? (
        <Routes>{/* Routes for after logging in. */}</Routes>
      ) : (
        <Routes>
          <Route path="" element={<LandingPage />} />
          <Route path="signin" element={<LoginPage />} />
          <Route path="signup" element={<RegisterPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
