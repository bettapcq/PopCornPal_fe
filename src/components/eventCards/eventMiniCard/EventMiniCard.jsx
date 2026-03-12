import { Card } from "react-bootstrap";
import "./EventMiniCard.scss";
import poster_placeholder from "../../../assets/img/poster-placeholder.jpg";
import { Link, useNavigate } from "react-router-dom";

function EventMiniCard(props) {
  const navigate = useNavigate();

  return (
    <Card
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`private/event/${props.event.eventId}`)}
      className="event-mini-card h-100 w-100"
    >
      <Card.Img
        variant="top"
        src={props.event.movie.Poster}
        alt={props.event.title}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = poster_placeholder;
        }}
      />
      <Card.Body>
        <Card.Text>{props.event.title}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default EventMiniCard;
