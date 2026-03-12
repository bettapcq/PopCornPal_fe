import "./EventPage.scss";
import {
  Card,
  Row,
  Col,
  Container,
  Button,
  Image,
  Spinner,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import poster_placeholder from "../../assets/img/poster-placeholder.jpg";
import avatar_placeholder from "../../assets/img/avatar_placeholder.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faFilm,
  faClock,
  faCalendarAlt,
  faMapMarker,
  faPencilAlt,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleEvent } from "../../redux/actions/EventActions";
import { joinEvent } from "../../redux/actions/EventActions";

function EventPage() {
  const params = useParams();
  const currentEventId = params.eventId;
  const dispatch = useDispatch();
  const currentEvent = useSelector((state) => state.events.selectedEvent);
  const loading = useSelector((state) => state.events.loading);
  const error = useSelector((state) => state.events.error);
  const userLogged = useSelector((state) => state.auth.userLogged);
  const participationStatus = useSelector(
    (state) => state.events.participationStatus[currentEventId],
  );
  let date = null;

  console.log("EVENT ID:", currentEventId);

  useEffect(() => {
    dispatch(getSingleEvent(currentEventId));
  }, [currentEventId, dispatch]);

  const handleJoin = (e) => {
    dispatch(joinEvent(currentEventId));
  };

  if (currentEvent?.eventDateTime) {
    date = new Date(currentEvent.eventDateTime);
  }

  const isPastEvent = date < new Date();

  const isCreator = userLogged?.userId === currentEvent?.creator?.userId;

  return (
    <>
      {/* loading */}
      {loading && (
        <div className="text-center mt-5">
          <Spinner variant="" animation="radius" />
        </div>
      )}
      {/* error */}
      {error && <p className="text-danger text-center mt-5">{error}</p>}
      {/* no loading e no error build omponent */}
      {!error && !loading && currentEvent && (
        <Container className="event-detail-container">
          <Card className="event-detail-card">
            <Card.Body>
              <Row>
                {/* POSTER */}
                <Col md={4}>
                  <Image
                    src={currentEvent?.movie.Poster || poster_placeholder}
                    alt={currentEvent?.title}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = poster_placeholder;
                    }}
                    className="event-poster"
                  />
                </Col>

                <Col md={8}>
                  {/* creator button edit toggle */}
                  {isCreator && !isPastEvent && (
                    <Row className="flex-row justify-content-end text-end">
                      <Col>
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 400 }}
                          overlay={
                            <Tooltip id="button-tooltip-2">Edit event</Tooltip>
                          }
                        >
                          <FontAwesomeIcon
                            as={Button}
                            icon={faPencilAlt}
                            className="pencil-btn"
                          />
                        </OverlayTrigger>
                      </Col>
                    </Row>
                  )}
                  {/* CARD BODY */}
                  <Row className="flex-column g-4">
                    <Col
                      as={Link}
                      to={`/private/profile/${currentEvent.creator.userId}`}
                      className="d-flex flex-row align-items-center "
                    >
                      <Image
                        className="rounded-circle avatar m-3 avatar-link"
                        src={avatar_placeholder}
                        alt="avatar"
                        height={45}
                        width={45}
                      />
                      <Card.Subtitle className="avatar-link">
                        {currentEvent.creator.username}
                      </Card.Subtitle>
                    </Col>
                    <Col>
                      <h2>{currentEvent.title}</h2>
                      <p>{currentEvent.description}</p>
                    </Col>
                    <Row className="my-4">
                      <Col>
                        <Card.Text>
                          <FontAwesomeIcon
                            className="general-icon"
                            icon={faCalendarAlt}
                          />
                          {date.toLocaleDateString("it-IT")}
                        </Card.Text>
                        {date && (
                          <Card.Text>
                            <FontAwesomeIcon
                              className="general-icon"
                              icon={faClock}
                            />

                            {date.toLocaleTimeString("it-IT", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Card.Text>
                        )}
                        {date && (
                          <Card.Text>
                            <FontAwesomeIcon
                              icon={faMapMarker}
                              className="general-icon"
                            />
                            {currentEvent.eventType === "ONLINE"
                              ? "Online"
                              : currentEvent.location}
                          </Card.Text>
                        )}
                      </Col>

                      {/* MOVIE SECTION */}
                      <Col className="event-divider">
                        <Card.Text className="movie-title mb-3">
                          <FontAwesomeIcon
                            className="general-icon"
                            icon={faFilm}
                          />
                          MOVIE:
                        </Card.Text>
                        <Card.Subtitle className="mb-0 ms-2">
                          {currentEvent.movie.Title}
                        </Card.Subtitle>
                        <Card.Text className="mb-0  ms-2">
                          {currentEvent.movie.Year}
                        </Card.Text>
                        <Card.Text className="mb-0  ms-2">
                          {currentEvent.movie.Plot}
                        </Card.Text>
                        <Card.Text className="mb-0  ms-2">
                          {currentEvent.movie.Runtime}
                        </Card.Text>
                        <Card.Text className="mb-0  ms-2">
                          {currentEvent.movie.Genre}
                        </Card.Text>
                      </Col>
                    </Row>
                    {/* CARD FOOTER */}
                    <Col>
                      <Row className="d-flex flex-row justify-content-between align-items-center me-auto my-3 ">
                        <Col xs={4}>
                          <Card.Text>
                            <FontAwesomeIcon
                              className="general-icon"
                              xs={2}
                              icon={faUser}
                            />
                            {currentEvent.availableSpots}/
                            {currentEvent.maxParticipants}
                          </Card.Text>
                        </Col>
                        {/* creator button delete toggle*/}
                        <Col xs={4} className="text-end">
                          {isCreator && !isPastEvent ? (
                            <OverlayTrigger
                              placement="right"
                              delay={{ show: 250, hide: 400 }}
                              overlay={
                                <Tooltip id="button-tooltip-2">
                                  Delete event
                                </Tooltip>
                              }
                            >
                              <FontAwesomeIcon
                                as={Button}
                                icon={faTrashAlt}
                                className="pencil-btn event-delete-icon"
                              />
                            </OverlayTrigger>
                          ) : (
                            <Button
                              variant="primary"
                              className="w-100 join-btn"
                              disabled={
                                currentEvent.availableSpots === 0 || isPastEvent
                              }
                              onClick={handleJoin}
                            >
                              {isPastEvent
                                ? "Event finished"
                                : currentEvent.availableSpots === 0
                                  ? "Sold Out"
                                  : "Join Event"}
                            </Button>
                          )}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      )}
    </>
  );
}

export default EventPage;
