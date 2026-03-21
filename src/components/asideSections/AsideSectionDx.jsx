import { Container, Row, Col, Carousel, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import EventMiniCard from "../eventCards/eventMiniCard/EventMiniCard";
import EventXsCard from "../eventCards/eventXsCard/EventXsCard";
import { useEffect, useState } from "react";

function AsideSectionDx() {
  const joinedEvents = useSelector(
    (state) => state.events.userEvents.joinedEvents.content,
  );
  const pastEvents = useSelector(
    (state) => state.events.userEvents.pastEvents.content,
  );

  useEffect(() => {
    if (joinedEventsRaw && pastEventsRaw) {
      setFirstLoad(false);
    }
  }, [joinedEventsRaw, pastEventsRaw]);

  return (
    <Container fluid>
      {/* PAST EVENTS PORTION */}
      <h2>Past Events Created</h2>
      {/* lg version */}
      <Row className="glass-section my-4 flex-column gx-0 overflow-auto">
        <Col xs={12} className="d-none d-lg-flex aside-events flex-column">
          {!pastEvents ? (
            <Spinner variant="primary" animation="grow" />
          ) : pastEvents?.length > 0 ? (
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
        {/* xs version */}
        <Col className="d-lg-none">
          <Carousel>
            {pastEvents ? (
              <Spinner variant="primary" animation="grow" />
            ) : pastEvents?.length > 0 ? (
              pastEvents.map((event) => (
                <Carousel.Item key={event.eventId}>
                  <EventXsCard event={event} />
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
      <h2>Past Events Joined</h2>
      {/* lg version */}
      <Row className="glass-section my-4 flex-column gx-0 overflow-auto">
        <Col xs={12} className="d-none d-lg-flex aside-events flex-column">
          {joinedEvents ? (
            <Spinner variant="primary" animation="grow" />
          ) : joinedEvents?.length > 0 ? (
            <Row xs={12} className="g-2">
              {joinedEvents.map((event) => (
                <Col xs={6} key={event.eventId}>
                  <EventMiniCard event={event} />
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-center no-content-text">No joined events yet</p>
          )}
        </Col>
        {/* xs version */}
        <Col className="d-lg-none">
          <Carousel>
            {joinedEvents ? (
              <Spinner variant="primary" animation="grow" />
            ) : joinedEvents?.length > 0 ? (
              joinedEvents.map((event) => (
                <Carousel.Item key={event.eventId}>
                  <EventXsCard event={event} />
                </Carousel.Item>
              ))
            ) : (
              <Carousel.Item>
                <p className="text-center no-content-text">
                  No joined events yet
                </p>
              </Carousel.Item>
            )}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

export default AsideSectionDx;
