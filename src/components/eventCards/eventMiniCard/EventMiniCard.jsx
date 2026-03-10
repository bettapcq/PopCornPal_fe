import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Row } from "react-bootstrap";
import {
  faUser,
  faGlobeAsia,
  faHome,
  faStar,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";

function EventMiniCard() {
  return (
    <Card className="my-3">
      <Card.Img variant="top" src="https://picsum.photos/140/120" />
      <Card.Title>
        <FontAwesomeIcon className="me-1" icon={faGlobeAsia} />
        <FontAwesomeIcon className="me-1" icon={faHome} />
        EventTitle
      </Card.Title>
      <Card.Text className="ms-3">Movie Title</Card.Text>
      <Card.Text className="ms-3">date</Card.Text>
      <Card.Body className="d-flex flex-row justify-content-between align-items-center">
        <Card.Text xs={2} className="mb-0">
          <FontAwesomeIcon xs={2} icon={faUser} /> 4/4
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
