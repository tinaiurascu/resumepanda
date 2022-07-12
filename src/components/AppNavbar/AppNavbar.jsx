import { auth, logout } from "../../services/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./styles.scss";

const AppNavbar = () => {
  const [user] = useAuthState(auth);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            className="bi me-2"
            width="197"
            height="40"
            role="img"
            aria-label="Bootstrap"
            src="./pandalogo.png"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                >
                  <div className="navMenu">Resume</div>
                </NavLink>

                <NavLink to="/experience">
                  <div className="navMenu">Experiențe</div>
                </NavLink>

                <NavLink to="/education">
                  <div className="navMenu">Educație</div>
                </NavLink>

                <NavLink to="/profile">
                  <div className="navMenu">Profil</div>
                </NavLink>
              </>
            )}
          </Nav>

          {user ? (
            <div className="endNavContainer">
              <div>{user?.email}</div>
              <Nav.Link href="/logout" onClick={logout}>
                <Button variant="outline-secondary">Logout</Button>
              </Nav.Link>
            </div>
          ) : (
            <div className="text-end">
              <NavLink to="/register">
                <Button variant="warning" className="me-2">
                  Creare cont
                </Button>
              </NavLink>

              <NavLink to="/login">
                <Button variant="outline-secondary">Autentificare</Button>
              </NavLink>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
