import "../superiorNavBar/SuperiorNavBar.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import avatar_placeholder from "../../assets/img/avatar_placeholder.jpg";
import { faBell, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SuperiorNavBar() {
  return (
    <Navbar expand="lg" className="my-nav bg-body-tertiary mt-3 mb-4">
      <Container className="justify-content-between" fluid>
        {/* logo */}

        <Navbar.Brand md={2} as={Link} to="/home">
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
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
              Profile
            </Nav.Link>
            <Nav.Link as={Link} to="/events">
              Your Events
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* icons */}

        <Nav.Link as={Link} to="/messages" className="px-3">
          <FontAwesomeIcon icon={faComment} className="nav-icon" />
        </Nav.Link>
        <Nav.Link as={Link} to="/notifications" className="px-3">
          <FontAwesomeIcon icon={faBell} className="nav-icon" />
        </Nav.Link>

        {/* desktop avatar */}

        <NavDropdown
          title={
            <img
              className="rounded-circle avatar mx-2 "
              src={avatar_placeholder}
              alt="avatar"
              width={40}
              height={40}
            />
          }
          id="profile-dropdown"
          align="end"
        >
          <NavDropdown.Item to="/profile" as={Link}>
            View Profile
          </NavDropdown.Item>
          <NavDropdown.Item to="/edit-profile" as={Link}>
            Settings
          </NavDropdown.Item>
          <NavDropdown.Divider color="$text-light" />
          <NavDropdown.Item to="/logout" as={Link}>
            Log out
          </NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
}
export default SuperiorNavBar;
