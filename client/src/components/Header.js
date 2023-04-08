import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { app_name } from "../config/constants";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { isAuthenticated, signOut } = useAuth();
  return (
    <Navbar collapseOnSelect expand="md">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {app_name}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="header-nav" />
        <Navbar.Collapse id="header-nav">
          {isAuthenticated ? (
            <>
              <Nav>
                {/* Create any links to navigate around your app here */}
              </Nav>
              <Nav className="ms-auto">
                <Nav.Link onClick={signOut}>Sign Out</Nav.Link>
              </Nav>
            </>
          ) : (
            <Nav className="ms-auto">
              <Nav.Link eventKey={1} as={Link} to="/signin">
                Sign In
              </Nav.Link>
              <Nav.Link eventKey={2} as={Link} to="/signup">
                Create Account
              </Nav.Link>
              <Nav.Link eventKey={3} as={Link} to="/favorite">
                Favorites
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
