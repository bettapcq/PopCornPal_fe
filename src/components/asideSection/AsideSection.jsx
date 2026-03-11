import { Container, Row, Col, Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import EventMiniCard from "../eventCards/eventMiniCard/EventMiniCard";
import "./AsideSection.scss";
import EventCard from "../eventCards/eventCard/EventCard";

function AsideSection() {
  // const joinedEvents = useSelector((state) => state.events.joined);
  const pastEvents = useSelector(
    (state) => state.events.userEvents.pastEvents.content,
  );

  console.log("PAST EVENTS FROM STORE: ", pastEvents);

  return (
    <Container fluid>
      {/* PAST EVENTS PORTION */}
      <h2>Past Events</h2>
      <Row className="glass-section my-4 flex-column gx-0 overflow-auto">
        <Col xs={12} className="d-none d-lg-flex aside-events flex-column">
          {pastEvents?.length > 0 ? (
            <Row xs={12} className="g-2">
              {pastEvents.map((event) => (
                <Col xs={6} key={event.eventId}>
                  <EventMiniCard event={event} />
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-center no-content-text">No past events yet</p>
          )}
        </Col>
        <Col className="d-lg-none">
          <Carousel>
            {pastEvents?.length > 0 ? (
              pastEvents.map((event) => (
                <Carousel.Item key={event.eventId}>
                  <EventCard event={event} />
                </Carousel.Item>
              ))
            ) : (
              <Carousel.Item>
                <p className="text-center no-content-text">
                  No past events yet
                </p>
              </Carousel.Item>
            )}
          </Carousel>
        </Col>
      </Row>

      {/* JOINED EVENTS PORTION */}
      <h2>Events Joined</h2>
      <Row className="d-flex flex-column glass-section my-4">
        <Col className="my-2"></Col>
        <Col className="d-none d-lg-block">
          {/* {joinedEvents?.map((event) => (
            <EventMiniCard key={event.id} event={event} />
          ))} */}
        </Col>
        <Col className="d-lg-none">
          <Carousel>
            {/* {joinedEvents?.length !== 0 ? (
              joinedEvents.map((event) => (
                <Carousel.Item key={event.id}>
                  <EventMiniCard event={event} />
                </Carousel.Item>
              ))
            ) : (
              <Carousel.Item>
                <p className="text-center">No joined events yet</p>
              </Carousel.Item>
            )} */}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

export default AsideSection;
