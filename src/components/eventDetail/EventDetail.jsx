import "./EventDetail.scss";
import { Card, Row, Col, Container } from "react-bootstrap";

function EventDetail() {
  return (
    <Container className="event-detail-container">
      <Card className="event-detail-card">
        <Card.Body>
          <Row>
            <Col md={4}>
              <img
                // src={event.movie.poster}
                className="event-poster img-fluid"
              />
            </Col>

            <Col md={8}>
              <h2>EVENT TITLE</h2>

              <p className="movie-title">MOVIE TITLE</p>

              <p>DATE TIME</p>

              <p>LOCATION</p>

              <p className="spots">4 / 4</p>

              <Button
                className="join-btn"
                // disabled={event.availableSpots === 0}
              >
                Join Event
              </Button>

              <div className="participants">
                {/* {event.participants.map((user) => (
                  <img
                    key={user.userId}
                    src={user.avatar}
                    className="participant-avatar"
                  />
                ))} */}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EventDetail;
