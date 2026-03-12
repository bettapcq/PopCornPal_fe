import { Card } from "react-bootstrap";
import poster_placeholder from "../../../assets/img/poster-placeholder.jpg";
import "./EventXsCard.scss";
import {
  faExternalLinkAlt,
  faGlobeAsia,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

function EventXsCard(props) {
  const navigate = useNavigate();
  const date = new Date(props.event.eventDateTime);
  return (
    <Card
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`private/event/${props.event.eventId}`)}
      className="event-xs-card h-100 w-100"
    >
      <Card.Img
        src={props.event.movie.Poster}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = poster_placeholder;
        }}
      />
      <Card.Body className="flex-column justify-content-between">
        <Card.Title className="my-2">{props.event.title}</Card.Title>
        <Card.Text>
          <FontAwesomeIcon
            className="my-1"
            icon={props.event.eventType === "ONLINE" ? faGlobeAsia : faHome}
          />{" "}
        </Card.Text>
        <Card.Text>
          {date.toLocaleDateString("it-IT")} •{" "}
          {date.toLocaleTimeString("it-IT", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default EventXsCard;
