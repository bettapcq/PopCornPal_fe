import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Row } from "react-bootstrap";
import {
  faUser,
  faGlobeAsia,
  faHome,
  faStar,
  faStarHalfStroke,
  faCrown,
} from "@fortawesome/free-solid-svg-icons";

function EventMiniCard(props) {
  const date = new Date(props.event.eventDateTime);
  return (
    <Card className="my-3" ref={props.ref}>
      <Card.Img variant="top" src="https://picsum.photos/140/120" />
      <Card.Text className="ms-3 mt-3">
        <FontAwesomeIcon className="me-1" icon={faCrown} />
        {props.event.creator.username}
      </Card.Text>
      <Card.Title>
        <FontAwesomeIcon className="me-1" icon={faGlobeAsia} />
        <FontAwesomeIcon className="me-1" icon={faHome} />
        {props.event.title}
      </Card.Title>
      <Card.Text className="ms-3">{props.event.movie.Title}</Card.Text>
      <Card.Text className="ms-3">
        {date.toLocaleDateString("it-IT")} •{" "}
        {date.toLocaleTimeString("it-IT", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Card.Text>
      <Card.Body className="d-flex flex-row justify-content-between align-items-center">
        <Card.Text xs={2} className="mb-0">
          <FontAwesomeIcon xs={2} icon={faUser} /> 4/
          {props.event.maxParticipants}
        </Card.Text>
        <Card.Text xs={8} className="wrap no-wrap text-nowrap">
          <FontAwesomeIcon icon={faStar} className="star" />
          <FontAwesomeIcon icon={faStar} className="star" />
          <FontAwesomeIcon icon={faStar} className="star" />
          <FontAwesomeIcon icon={faStar} className="star" />
          <FontAwesomeIcon icon={faStarHalfStroke} className="star" />
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default EventMiniCard;
