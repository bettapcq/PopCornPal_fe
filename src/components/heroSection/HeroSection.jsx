import { Row, Col, Button, Carousel } from "react-bootstrap";
import EventCard from "../eventCards/eventCard/EventCard";
import { useNavigate } from "react-router-dom";

function HeroSection({ events }) {
  const navigate = useNavigate();

  return (
    <Row className="hero-section align-items-center my-4">
      <Col md={5}>
        <h1>Find your next movie night</h1>

        <Button
          className="hero-btn"
          onClick={() => navigate("/private/event/form")}
        >
          Create Event
        </Button>
      </Col>

      <Col xs={12} lg={7}>
        <Carousel indicators={false} className="w-100">
          {events?.map((event) => (
            <Carousel.Item key={event.eventId}>
              <EventCard event={event} />
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>
    </Row>
  );
}

export default HeroSection;
