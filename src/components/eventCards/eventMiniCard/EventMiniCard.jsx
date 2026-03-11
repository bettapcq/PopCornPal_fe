import { Card } from "react-bootstrap";
import "./EventMiniCard.scss";
import poster_placeholder from "../../../assets/img/poster-placeholder.jpg";

function EventMiniCard(props) {
  return (
    <Card className="event-mini-card h-100 w-100">
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
