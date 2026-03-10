import { Container, Row, Col, Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import EventMiniCard from "../eventCards/eventMiniCard/EventMiniCard";
import "./AsideSection.scss";

function AsideSection() {
  //   const joinedEvents = useSelector((state) => state.events.joined);
  //   const pastEvents = useSelector((state) => state.events.past);

  return (
    <Container className="" fluid>
      {/* PAST EVENTS PORTION */}
      <Row className="d-flex flex-column glass-section my-4">
        <Col className="my-2 mx-0">
          <h3>Past Events</h3>
        </Col>
        <Col className="d-none d-lg-block">
          {/* {pastEvents?.map((event) => (
            <EventMiniCard key={event.id} event={event} />
          ))} */}
          <EventMiniCard />
          <EventMiniCard />
          <EventMiniCard />
        </Col>
        <Col className="d-lg-none">
          <Carousel>
            {/* {pastEvents?.map((event) => (
            <EventMiniCard key={event.id} event={event} />
          ))} */}
            <Carousel.Item interval={1000}>
              <EventMiniCard />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <EventMiniCard />
            </Carousel.Item>
            <Carousel.Item>
              <EventMiniCard />
            </Carousel.Item>
          </Carousel>
          {/* {pastEvents?.map((event) => (
            <EventMiniCard key={event.id} event={event} />
          ))} */}
        </Col>
      </Row>

      {/* JOINED EVENTS PORTION */}
      <Row className="d-flex flex-column glass-section my-4">
        <Col className="my-2">
          <h3>Events Joined</h3>
        </Col>
        <Col className="d-none d-lg-block">
          {/* {joinedEvents?.map((event) => (
            <EventMiniCard key={event.id} event={event} />
          ))} */}
          <EventMiniCard />
          <EventMiniCard />
          <EventMiniCard />
        </Col>
        <Col className="d-lg-none">
          <Carousel>
            {/* {pastEvents?.map((event) => (
            <EventMiniCard key={event.id} event={event} />
          ))} */}
            <Carousel.Item interval={1000}>
              <EventMiniCard />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <EventMiniCard />
            </Carousel.Item>
            <Carousel.Item>
              <EventMiniCard />
            </Carousel.Item>
          </Carousel>
          {/* {pastEvents?.map((event) => (
            <EventMiniCard key={event.id} event={event} />
          ))} */}
        </Col>
      </Row>
    </Container>
  );
}

export default AsideSection;
