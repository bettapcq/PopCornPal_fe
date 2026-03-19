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
  faStar,
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
import { rateParticipation } from "../../../redux/actions/ParticipationActions";
import DinamicRatingStars from "../../ratingStars/DinamicRatingStars";
import { useDispatch } from "react-redux";
import { getSingleEvent } from "../../../redux/actions/EventActions";
import StaticRatingStars from "../../ratingStars/StaticRatingStars";

function EventDetailCard(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const canRate =
    props.isPastEvent &&
    props.participation?.status === "ACCEPTED" &&
    props.participation?.participantRating <= 0 &&
    !props.isCreator;

  const handleRate = (rating) => {
    dispatch(rateParticipation(props.participation.participationId, rating));
    dispatch(getSingleEvent(props.currentEvent.eventId));
  };

  return (
    <Card className="event-detail-card">
      <Card.Body>
        <Row>
          {/* POSTER */}
          <Col md={4}>
            <Image
              src={props.currentEvent?.movie?.Poster || poster_placeholder}
              className="event-poster"
              alt={props.currentEvent?.title}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = poster_placeholder;
              }}
            />
          </Col>

          <Col md={8}>
            {/* creator button edit toggle */}
            {props.isCreator && !props.isPastEvent && (
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
                        navigate(
                          `/private/event/form/${props.currentEvent.eventId}`,
                        )
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
                to={`/private/profile/${props.currentEvent?.creator.userId}`}
                className="d-flex flex-row align-items-center "
              >
                <Image
                  className="rounded-circle avatar m-3 avatar-link"
                  src={
                    props.currentEvent.creator.profileImg || avatar_placeholder
                  }
                  alt="avatar"
                  height={45}
                  width={45}
                />

                <Card.Subtitle className="avatar-link">
                  {props.currentEvent?.creator.username}
                </Card.Subtitle>
              </Col>
              <Col>
                {props.currentEvent?.ratingAvg > 0 && (
                  <StaticRatingStars rating={props.currentEvent?.ratingAvg} />
                )}
                <h2>{props.currentEvent.title}</h2>
                <p>{props.currentEvent.description}</p>
              </Col>
              <Row className="my-4">
                <Col>
                  <Card.Text>
                    <FontAwesomeIcon
                      className="general-icon"
                      icon={faCalendarAlt}
                    />
                    {props.date.toLocaleDateString("it-IT")}
                  </Card.Text>
                  {props.date && (
                    <Card.Text>
                      <FontAwesomeIcon
                        className="general-icon"
                        icon={faClock}
                      />

                      {props.date.toLocaleTimeString("it-IT", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Card.Text>
                  )}
                  {props.date && (
                    <Card.Text>
                      <FontAwesomeIcon
                        icon={faMapMarker}
                        className="general-icon"
                      />

                      {props.currentEvent?.eventType === "ONLINE" ? (
                        "Online event"
                      ) : props.currentEvent?.address ? (
                        <>
                          {props.currentEvent.address} —{" "}
                          {props.currentEvent?.location?.city}
                        </>
                      ) : (
                        <>
                          {props.currentEvent?.location?.city} —{" "}
                          <span className="text-muted">
                            Address available 3 days before the event
                          </span>
                        </>
                      )}
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
                    {props.currentEvent.movie.Title}
                  </Card.Subtitle>
                  <Card.Text className="mb-0  ms-2">
                    {props.currentEvent.movie.Year}
                  </Card.Text>
                  <Card.Text className="mb-0  ms-2">
                    {props.currentEvent.movie.Plot}
                  </Card.Text>
                  <Card.Text className="mb-0  ms-2">
                    {props.currentEvent.movie.Runtime}
                  </Card.Text>
                  <Card.Text className="mb-0  ms-2">
                    {props.currentEvent.movie.Genre}
                  </Card.Text>
                </Col>
              </Row>
              {/* CARD FOOTER */}
              <Col>
                <Row className="d-flex flex-row justify-content-between align-items-center me-auto my-3 ">
                  <Col xs={4}>
                    <Card.Text
                      className={` ${props.isFull ? "text-danger" : "text-success"}`}
                    >
                      <FontAwesomeIcon
                        className="general-icon"
                        xs={2}
                        icon={faUser}
                      />
                      {props.currentEvent.reservedSpots || 0}/
                      {props.currentEvent.maxParticipants}
                    </Card.Text>
                  </Col>
                  {/* creator button delete toggle*/}
                  <Col xs={4} className="text-end mb-2">
                    {props.isCreator && !props.isPastEvent && (
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={<Tooltip>Delete event</Tooltip>}
                      >
                        <FontAwesomeIcon
                          as={Button}
                          icon={faTrashAlt}
                          className="pencil-btn event-delete-icon"
                          onClick={props.handleOpenDelete}
                        />
                      </OverlayTrigger>
                    )}

                    {!props.isCreator && (
                      <Button
                        variant={
                          props.currentEvent?.userParticipationStatus ===
                          "PENDING"
                            ? "warning"
                            : "primary"
                        }
                        className="w-100 join-btn"
                        disabled={
                          props.isPastEvent ||
                          props.currentEvent?.userParticipationStatus ===
                            "REJECTED" ||
                          props.currentEvent?.userParticipationStatus ===
                            "PENDING"
                        }
                        onClick={
                          props.currentEvent?.userParticipationStatus ===
                          "ACCEPTED"
                            ? props.handleLeave
                            : props.handleOpenJoin
                        }
                      >
                        {props.isPastEvent
                          ? props.currentEvent?.userParticipationStatus ===
                            "ACCEPTED"
                            ? "Joined"
                            : "Event finished"
                          : props.currentEvent?.userParticipationStatus ===
                              "PENDING"
                            ? "Request sent"
                            : props.currentEvent?.userParticipationStatus ===
                                "REJECTED"
                              ? "Rejected"
                              : props.currentEvent?.userParticipationStatus ===
                                  "ACCEPTED"
                                ? "Leave Event"
                                : props.currentEvent?.reservedSpots ===
                                    props.currentEvent?.maxParticipants
                                  ? "Join waiting list"
                                  : "Join Event"}
                      </Button>
                    )}
                  </Col>

                  {/* rating section */}
                  {canRate && (
                    <Row className="d-flex flex-column align-items-end text-end me-0 px-1">
                      <Col className="px-0">
                        <Card.Text className="mb-0">
                          How was this event?
                        </Card.Text>
                        <DinamicRatingStars onRate={handleRate} />
                      </Col>
                    </Row>
                  )}
                  {props.participation?.participantRating > 0 && (
                    <Row className="d-flex flex-column align-items-end text-end me-0 px-1">
                      <Col className="px-0">
                        <Card.Text className="fs-7">
                          Your rating:{" "}
                          <FontAwesomeIcon
                            icon={faStar}
                            className="star fs-7"
                          />
                          {props.participation?.participantRating} / 5
                        </Card.Text>
                      </Col>
                    </Row>
                  )}
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
