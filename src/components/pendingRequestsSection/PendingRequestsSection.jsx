import { Container, Col, Row, ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector } from "react-redux";

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
                <ListGroup.Item key={req.participationId}>
                  <h3>{req.user.username}</h3>
                  <div>
                    <Button size="sm" variant="success">
                      Accept
                    </Button>

                    <Button size="sm" variant="danger" className="ms-2">
                      Reject
                    </Button>
                  </div>
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
