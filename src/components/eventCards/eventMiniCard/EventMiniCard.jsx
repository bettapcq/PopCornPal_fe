import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col } from "react-bootstrap";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function EventMiniCard() {
  return (
    <Card className="my-3">
      <Card.Img variant="top" src="https://picsum.photos/140/120" />
      <Card.Title>Event Title</Card.Title>
      <Card.Text className="ms-3">Movie Title</Card.Text>
      <Card.Body className="d-flex flex-row justify-content-between">
        <Card.Text xs={4}>date</Card.Text>
        <Col xs={4} className="d-flex flex-row justify-content-end">
          <FontAwesomeIcon className="me-1" icon={faUser} />
          <Card.Text>4/4</Card.Text>
        </Col>
      </Card.Body>
    </Card>
  );
}

export default EventMiniCard;
