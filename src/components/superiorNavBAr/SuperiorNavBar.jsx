import "../superiorNavBar/SuperiorNavBar.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Image, Button } from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import avatar_placeholder from "../../assets/img/avatar_placeholder.jpg";
import { faBell, faComment, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/actions/UserActions";
import { useEffect } from "react";
import { logout } from "../../redux/actions/AuthActions";

function SuperiorNavBar() {
  const user = useSelector((state) => state.users.profile);
  const myId = useSelector((state) => state.auth.userLogged?.userId); // "?" for the first render
  const params = useParams();
  const userId = params.userId;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileId = userId || myId;

  const HandleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!profileId) return;
    dispatch(getProfile(profileId));
  }, [dispatch]);

  return (
    <Navbar expand="lg" className="my-nav mt-3 mb-4">
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
            <Nav.Link as={NavLink} to="/private/notifications">
              Notifications
            </Nav.Link>
            <Nav.Link as={NavLink} to="/private/messages">
              Messages
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* icons */}

        <Nav.Link
          as={NavLink}
          to="/private/messages"
          className="px-3 d-lg-none"
        >
          <FontAwesomeIcon icon={faComment} className="nav-icon" />
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          to="/private/notifications"
          className="px-3 d-lg-none"
        >
          <FontAwesomeIcon icon={faBell} className="nav-icon" />
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          to="/private/create-event"
          className="px-3 d-lg-none"
        >
          <FontAwesomeIcon icon={faPlus} className="create-event-icon" />
        </Nav.Link>
        <Button
          className="create-event-btn d-none d-lg-flex"
          onClick={() => navigate("/private/event/new")}
        >
          + New Party
        </Button>

        {/* desktop avatar */}

        <NavDropdown
          title={
            <Image
              className="rounded-circle avatar"
              src={user?.profileImg || avatar_placeholder}
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
          <NavDropdown.Item as={NavLink} to="/private/backoffice">
            Backoffice
          </NavDropdown.Item>
          <NavDropdown.Divider color="$text-light" />
          <NavDropdown.Item
            type="button"
            onClick={HandleLogout}
            as={NavLink}
            to="/"
          >
            Log out
          </NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
}
export default SuperiorNavBar;
