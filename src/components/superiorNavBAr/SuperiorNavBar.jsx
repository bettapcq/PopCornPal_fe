import "../superiorNavBar/SuperiorNavBar.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Image, Button, Badge } from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import avatar_placeholder from "../../assets/img/avatar_placeholder.jpg";
import logo_mini from "../../assets/img/logo_mini.png";
import {
  faBell,
  faComment,
  faPlus,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/actions/UserActions";
import { useEffect } from "react";
import { logout } from "../../redux/actions/AuthActions";
import {
  getNotifications,
  getnotificationUnreadCount,
  markNotificationAsRead,
} from "../../redux/actions/NotificationActions";

function SuperiorNavBar() {
  const user = useSelector((state) => state.users.profile);
  const userLogged = useSelector((state) => state.auth.userLogged);
  const myId = userLogged?.userId; // "?" for the first render
  const params = useParams();
  const userId = params.userId;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const unreadNotificationCount = useSelector(
    (state) => state.notifications?.unreadCount,
  );
  const notifications = useSelector(
    (state) => state.notifications?.notifications.content,
  );

  const profileId = userId || myId;

  const HandleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!profileId) return;
    dispatch(getProfile(profileId));
    dispatch(getNotifications());
    dispatch(getnotificationUnreadCount());
  }, [dispatch, profileId, unreadNotificationCount]);

  return (
    <Navbar expand="lg" className="my-nav mt-3 mb-4">
      <Container className="justify-content-between" fluid>
        {/* logo */}

        <Navbar.Brand md={2} as={NavLink} to="/private/home">
          <img className="logo-mini" src={logo_mini} alt="logo" />
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
            <div className="notification-link">
              <NavDropdown title={"Notifications"}>
                {notifications?.slice(0, 3).map((n) => (
                  <NavDropdown.Item
                    key={n.notificationId}
                    onClick={() => {
                      dispatch(markNotificationAsRead(n.notificationId));
                      navigate(n.link);
                    }}
                  >
                    {n.read === false ? (
                      <>
                        <FontAwesomeIcon
                          icon={faExclamationCircle}
                          className="notification-unread-icon"
                        />
                        <strong>{n.message}</strong>
                      </>
                    ) : (
                      <p className="m-0">{n.message}</p>
                    )}
                  </NavDropdown.Item>
                ))}
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => navigate("/private/notifications")}
                >
                  View all notifications
                </NavDropdown.Item>
              </NavDropdown>
              {unreadNotificationCount > 0 && (
                <span className="notification-badge">
                  {unreadNotificationCount}
                </span>
              )}
            </div>

            {/* <Nav.Link as={NavLink} to="/private/messages">
              Messages
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>

        {/* icons */}

        {/* <Nav.Link
          as={NavLink}
          to="/private/messages"
          className="px-3 d-lg-none"
        >
          <FontAwesomeIcon icon={faComment} className="nav-icon" />
        </Nav.Link> */}
        <Nav.Link
          as={NavLink}
          to="/private/notifications"
          className="px-3 d-lg-none notification-icon-wrapper"
        >
          <FontAwesomeIcon icon={faBell} className="nav-icon" />

          {unreadNotificationCount > 0 && (
            <Badge pill className="notification-badge">
              {unreadNotificationCount}
            </Badge>
          )}
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          to="/private/event/form"
          className="px-3 d-lg-none"
        >
          <FontAwesomeIcon icon={faPlus} className="create-event-icon" />
        </Nav.Link>
        <Button
          className="create-event-btn d-none d-lg-flex"
          onClick={() => navigate("/private/event/form")}
        >
          + New Party
        </Button>

        {/* desktop avatar */}

        <NavDropdown
          title={
            <Image
              className="rounded-circle avatar"
              src={userLogged?.profileImg || avatar_placeholder}
              alt="avatar"
              height={45}
              width={45}
            />
          }
          id="profile-dropdown"
          align="end"
        >
          <p className="w-100 fs-7 text-center px-1">{userLogged?.email}</p>
          <NavDropdown.Item as={NavLink} to="/private/profile">
            My Profile
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/private/security">
            Settings
          </NavDropdown.Item>
          {/* <NavDropdown.Item as={NavLink} to="/private/backoffice">
            Backoffice
          </NavDropdown.Item> */}
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
