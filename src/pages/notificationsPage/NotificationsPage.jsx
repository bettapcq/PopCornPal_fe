import { Container, ListGroup, Spinner, Alert, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotifications,
  getnotificationUnreadCount,
  markNotificationAsRead,
} from "../../redux/actions/NotificationActions";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheckSquare } from "@fortawesome/free-solid-svg-icons";

function NotificationsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notifications = useSelector(
    (state) => state.notifications?.notifications.content,
  );
  const loading = useSelector((state) => state.notifications?.loading);
  const error = useSelector((state) => state.notifications?.error);

  useEffect(() => {
    dispatch(getNotifications());
  }, []);

  const handleMarkAllAsRead = async () => {
    const unread = notifications?.filter((n) => !n.read);

    await Promise.all(
      unread.map((n) => dispatch(markNotificationAsRead(n.notificationId))),
    );

    dispatch(getnotificationUnreadCount());
  };

  return (
    <Container fluid className="mt-4 main-content">
      <Button
        variant="link"
        className="mb-3 modal-close text-start"
        onClick={() => navigate(-1)}
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </Button>
      <h2>All Notifications</h2>{" "}
      {loading && <Spinner animation="grow" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}
      <ListGroup className="mt-3 ">
        {notifications?.length === 0 && <p>No notifications yet</p>}
        <Button
          variant="link"
          className="modal-close"
          onClick={handleMarkAllAsRead}
        >
          Mark all as read <FontAwesomeIcon icon={faCheckSquare} />
        </Button>
        {notifications?.map((n) => (
          <ListGroup.Item
            key={n.notificationId}
            className="d-flex justify-content-between list-dark"
            onClick={() => {
              dispatch(markNotificationAsRead(n.notificationId));
              navigate(n.link);
            }}
          >
            <div>
              <p
                className={`mb-1 item-gold ${
                  !n.read ? "notification-unread" : "notification-read"
                }`}
              >
                {n.message}
              </p>
              <small className="text-muted">
                {new Date(n.createdAt).toLocaleString()}
              </small>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default NotificationsPage;
