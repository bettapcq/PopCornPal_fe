import { Container, Col, Row, ListGroup, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./PendingRequestsSection.scss";

function PendingRequestsSection() {
  const participationRequests = useSelector(
    (state) => state.events.participationRequests,
  );

  return (
    <Container fluid>
      <Row className="glass-section  my-4 flex-column gx-0">
        <Col xs={12} className="flex-column">
          <h2>Pending Requests</h2>
          <ListGroup className="w-100">
            {participationRequests?.length > 0 ? (
              participationRequests.map((req) => (
                <ListGroup.Item
                  key={req.participationId}
                  className="pending-list-item"
                >
                  <Row className="align-items-center flex-column">
                    <Col>
                      <Link to={`/private/profile/${req.user.userId}`}>
                        <h3>{req.user.username}</h3>
                      </Link>
                    </Col>
                    <Col className="text-end">
                      <Button size="sm" variant="success">
                        Accept
                      </Button>
                      <Button size="sm" variant="danger" className="ms-2">
                        Reject
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))
            ) : (
              <p className="text-center no-content-text m-3">
                No pending requests
              </p>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default PendingRequestsSection;
