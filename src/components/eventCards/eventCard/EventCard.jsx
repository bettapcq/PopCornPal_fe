import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Row, Button } from "react-bootstrap";
import {
  faUser,
  faGlobeAsia,
  faHome,
  faStar,
  faStarHalfStroke,
  faCrown,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import poster_placeholder from "../../../assets/img/poster-placeholder.jpg";
import "./EventCard.scss";

function EventCard(props) {
  const date = new Date(props.event.eventDateTime);
  const isFull = props.event.reservedSpots >= props.event.maxParticipants;
  return (
    <Card className="my-3 flex-row event-card">
      <Card.Img
        xs={4}
        variant="left"
        src={props.event.movie.Poster}
        alt={props.event.title}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = poster_placeholder;
        }}
      />
      <Card.Body xs={8} className="d-flex flex-column justify-content-between">
        <Card.Body className="d-flex flex-row justify-content-between">
          <Card.Title className="fustify-content-between">
            {props.event.title}
          </Card.Title>
          <Card.Title>
            <FontAwesomeIcon
              className="me-1 card-icon"
              icon={props.event.eventType === "ONLINE" ? faGlobeAsia : faHome}
            />
          </Card.Title>
        </Card.Body>
        <Card.Text className="ms-3 mt-3">
          <FontAwesomeIcon className="me-1" icon={faCrown} />
          {props.event.creator.username}
        </Card.Text>

        <Card.Text className="ms-3">{props.event.movie.Title}</Card.Text>
        <Card.Text className="ms-3">
          {date.toLocaleDateString("it-IT")} •{" "}
          {date.toLocaleTimeString("it-IT", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Card.Text>
        <Card.Body className="d-flex flex-row justify-content-between mt-auto">
          <Card.Text
            xs={2}
            className={`mb-0 ${isFull ? "text-danger" : "text-success"}`}
          >
            <FontAwesomeIcon xs={2} icon={faUser} />{" "}
            {props.event.reservedSpots || 0}/{props.event.maxParticipants}
          </Card.Text>
        </Card.Body>
        <Card.Body className="d-flex justify-content-between align-items-center mt-auto">
          <Button
            as={Link}
            to={`/private/event/${props.event.eventId}`}
            xs={3}
            className="card-btn"
          >
            More info..
          </Button>
        </Card.Body>
      </Card.Body>
    </Card>
  );
}

export default EventCard;
