import "../superiorNavBar/SuperiorNavBar.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import avatar_placeholder from "../../assets/img/avatar_placeholder.jpg";
import { faBell, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SuperiorNavBar() {
  return (
    <Navbar expand="lg" className="my-nav bg-body-tertiary mt-3 mb-4">
      <Container className="justify-content-between" fluid>
        {/* logo */}

        <Navbar.Brand md={2} as={NavLink} to="/private/home">
          <img
            className="logo-mini"
            src="/src/assets/img/logo_mini.png"
            alt="logo"
          />
        </Navbar.Brand>

        {/* toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="my-toggle" />

        {/* collapse mobile links */}

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto my-3 align-items-center my-collapse">
            <Nav.Link as={NavLink} to="/private/home">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/private/profile">
              My Profile
            </Nav.Link>
            <Nav.Link as={NavLink} to="/private/events">
              My Events
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* icons */}

        <Nav.Link as={NavLink} to="/private/messages" className="px-3">
          <FontAwesomeIcon icon={faComment} className="nav-icon" />
        </Nav.Link>
        <Nav.Link as={NavLink} to="/private/notifications" className="px-3">
          <FontAwesomeIcon icon={faBell} className="nav-icon" />
        </Nav.Link>

        {/* desktop avatar */}

        <NavDropdown
          title={
            <Image
              className="rounded-circle avatar"
              src={avatar_placeholder}
              alt="avatar"
              height={45}
              width={45}
            />
          }
          id="profile-dropdown"
          align="end"
        >
          <NavDropdown.Item as={NavLink} to="/private/profile/me">
            My Profile
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/private/edit-profile">
            Settings
          </NavDropdown.Item>
          <NavDropdown.Divider color="$text-light" />
          <NavDropdown.Item as={NavLink} to="/">
            Log out
          </NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
}
export default SuperiorNavBar;
