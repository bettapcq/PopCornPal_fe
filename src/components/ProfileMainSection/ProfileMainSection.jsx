import { Container, Row, Col, Carousel } from "react-bootstrap";
import EventCard from "../eventCards/eventCard/EventCard";
import { useSelector } from "react-redux";
import EventXsCard from "../eventCards/eventXsCard/EventXsCard";

function ProfileMainSection(props) {
  const futureEvents = useSelector(
    (state) => state.events.userEvents.futureEvents?.content,
  );

  console.log("FUTURE EVENTS FROM STORE: ", futureEvents);

  return (
    <Container fluid>
      <h2>{props.profileUsername} Future Events</h2>
      <Row className="flex-column my-4 ">
        {/* lg version */}
        <Col xs={12} className="d-none d-lg-flex flex-column">
          {futureEvents?.length > 0 ? (
            <Row xs={12}>
              {futureEvents.map((event) => (
                <Col xs={12} key={event.eventId}>
                  <EventCard event={event} />
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-center no-content-text">No future events yet</p>
          )}
        </Col>
        {/* mobile carousel */}
        <Col className="d-lg-none p-4 ">
          <Carousel>
            {futureEvents?.length > 0 ? (
              futureEvents.map((event) => (
                <Carousel.Item className="my-4" key={event.eventId}>
                  <EventXsCard event={event} />
                </Carousel.Item>
              ))
            ) : (
              <Carousel.Item>
                <p className="text-center no-content-text">
                  No future events yet
                </p>
              </Carousel.Item>
            )}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileMainSection;
