import { Container, Row, Col, Carousel, Spinner } from "react-bootstrap";
import EventMiniCard from "../eventCards/eventMiniCard/EventMiniCard";
import EventXsCard from "../eventCards/eventXsCard/EventXsCard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function AsideSectionSx() {
  const eventsToJoin = useSelector(
    (state) => state.events.userEvents.toJoinEvents?.content,
  );

  return (
    <Container fluid>
      <h2>Future EventsTo Join</h2>
      {/* lg version */}
      <Row className="glass-section my-4 flex-column gx-0 overflow-auto">
        <Col xs={12} className="d-none d-lg-flex aside-events flex-column">
          {!eventsToJoin ? (
            <Spinner variant="primary" animation="grow" />
          ) : eventsToJoin?.length > 0 ? (
            <Row xs={12} className="g-1">
              {eventsToJoin.map((event) => (
                <Col xs={12} key={event.eventId}>
                  <EventMiniCard event={event} />
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-center no-content-text">No events to join yet</p>
          )}
        </Col>
        {/* xs version */}
        <Col className="d-lg-none">
          <Carousel>
            {!hasLoaded ? (
              <Spinner variant="primary" animation="grow" />
            ) : eventsToJoin?.length > 0 ? (
              eventsToJoin.map((event) => (
                <Carousel.Item key={event.eventId}>
                  <EventXsCard event={event} />
                </Carousel.Item>
              ))
            ) : (
              <Carousel.Item>
                <p className="text-center no-content-text">
                  No events to join yet
                </p>
              </Carousel.Item>
            )}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

export default AsideSectionSx;
