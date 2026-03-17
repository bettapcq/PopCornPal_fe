import poster_placeholder from "../../../assets/img/poster-placeholder.jpg";
import avatar_placeholder from "../../../assets/img/avatar_placeholder.jpg";
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
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip,
  Image,
} from "react-bootstrap";

function EventDetailCard({
  currentEvent,
  isCreator,
  isPastEvent,
  participationStatus,
  isFull,
  date,
  handleOpenJoin,
  handleOpenDelete,
  handleLeave,
}) {
  const navigate = useNavigate();

  return (
    <Card className="event-detail-card">
      <Card.Body>
        <Row>
          {/* POSTER */}
          <Col md={4}>
            <Image
              src={currentEvent?.movie?.Poster || poster_placeholder}
              className="event-poster"
              alt={currentEvent?.title}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = poster_placeholder;
              }}
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
                      onClick={() =>
                        navigate(`/private/event/form/${currentEvent.eventId}`)
                      }
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
                to={`/private/profile/${currentEvent?.creator.userId}`}
                className="d-flex flex-row align-items-center "
              >
                <Image
                  className="rounded-circle avatar m-3 avatar-link"
                  src={currentEvent.creator.profileImg || avatar_placeholder}
                  alt="avatar"
                  height={45}
                  width={45}
                />
                <Card.Subtitle className="avatar-link">
                  {currentEvent?.creator.username}
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
                      {currentEvent?.eventType === "ONLINE"
                        ? "Online"
                        : `${currentEvent?.location?.street} ${currentEvent?.location?.civicNumber}, ${currentEvent?.location?.city}`}
                    </Card.Text>
                  )}
                </Col>

                {/* MOVIE SECTION */}
                <Col className="event-divider">
                  <Card.Text className="movie-title mb-3">
                    <FontAwesomeIcon className="general-icon" icon={faFilm} />
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
                    <Card.Text
                      className={` ${isFull ? "text-danger" : "text-success"}`}
                    >
                      <FontAwesomeIcon
                        className="general-icon"
                        xs={2}
                        icon={faUser}
                      />
                      {currentEvent.reservedSpots || 0}/
                      {currentEvent.maxParticipants}
                    </Card.Text>
                  </Col>
                  {/* creator button delete toggle*/}
                  <Col xs={4} className="text-end">
                    {isCreator && !isPastEvent && (
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={<Tooltip>Delete event</Tooltip>}
                      >
                        <FontAwesomeIcon
                          as={Button}
                          icon={faTrashAlt}
                          className="pencil-btn event-delete-icon"
                          onClick={handleOpenDelete}
                        />
                      </OverlayTrigger>
                    )}

                    {!isCreator && (
                      <Button
                        variant={
                          participationStatus === "PENDING"
                            ? "warning"
                            : "primary"
                        }
                        className="w-100 join-btn"
                        disabled={
                          isPastEvent ||
                          participationStatus === "REJECTED" ||
                          participationStatus === "PENDING"
                        }
                        onClick={
                          participationStatus === "ACCEPTED"
                            ? handleLeave
                            : handleOpenJoin
                        }
                      >
                        {isPastEvent
                          ? participationStatus === "ACCEPTED"
                            ? "Joined"
                            : "Event finished"
                          : participationStatus === "PENDING"
                            ? "Request sent"
                            : participationStatus === "REJECTED"
                              ? "Rejected"
                              : participationStatus === "ACCEPTED"
                                ? "Leave Event"
                                : currentEvent?.reservedSpots ===
                                    currentEvent?.maxParticipants
                                  ? "Join waiting list"
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
  );
}

export default EventDetailCard;
