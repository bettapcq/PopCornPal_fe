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
    <Card className="my-3 event-card">
      <Row className="g-0">
        {/* IMAGE */}
        <Col xs={4} sm={4} md={4}>
          <Card.Img
            src={props.event.movie.Poster}
            alt={props.event.title}
            className="event-card-img"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = poster_placeholder;
            }}
          />
        </Col>

        {/* CONTENT */}
        <Col xs={8} sm={8} md={8}>
          <Card.Body className="d-flex flex-column h-100">
            {/* title + icon */}
            <div className="d-flex justify-content-between">
              <Card.Title>{props.event.title}</Card.Title>

              <FontAwesomeIcon
                className="card-icon"
                icon={
                  props.event.address === null &&
                  props.event.eventType === "ONLINE"
                    ? faGlobeAsia
                    : faHome
                }
              />
            </div>

            {/* creator */}
            <Card.Text>
              <FontAwesomeIcon className="me-1" icon={faCrown} />
              {props.event.creator.username}
            </Card.Text>

            <Card.Text>{props.event.movie.Title}</Card.Text>

            <Card.Text>
              {date.toLocaleDateString("it-IT")} •{" "}
              {date.toLocaleTimeString("it-IT", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Card.Text>

            {/* footer */}
            <div className="d-flex justify-content-between align-items-center mt-auto">
              <span className={isFull ? "text-danger" : "text-success"}>
                <FontAwesomeIcon icon={faUser} />{" "}
                {props.event.reservedSpots || 0}/{props.event.maxParticipants}
              </span>

              <Button
                as={Link}
                to={`/private/event/${props.event.eventId}`}
                className="card-btn"
              >
                More info
              </Button>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default EventCard;
