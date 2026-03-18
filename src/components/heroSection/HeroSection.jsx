import { Row, Col, Button, Carousel } from "react-bootstrap";
import EventCard from "../eventCards/eventCard/EventCard";
import { useNavigate } from "react-router-dom";

function HeroSection({ events }) {
  const navigate = useNavigate();

  return (
    <Row className="hero-section align-items-center my-4">
      <Col lg={5}>
        <h1>Find your next movie night</h1>
        <p>Join movie lovers near you</p>

        <Button
          className="hero-btn"
          onClick={() => navigate("/private/event/form")}
        >
          Create Event
        </Button>
      </Col>

      <Col lg={7}>
        <Carousel indicators={false}>
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
