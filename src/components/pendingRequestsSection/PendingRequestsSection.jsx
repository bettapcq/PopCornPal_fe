import { Container, Col, Row, ListGroup, Button, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./PendingRequestsSection.scss";
import avatar_placeholder from "../../assets/img/avatar_placeholder.jpg";
import { useDispatch } from "react-redux";
import { manageParticipationsRequests } from "../../redux/actions/ParticipationActions";

function PendingRequestsSection() {
  const participationRequests = useSelector(
    (state) => state.participations.requests,
  );

  console.log("Pending Req: ", participationRequests);

  const dispatch = useDispatch();

  return (
    <Container fluid>
      <Row className="glass-section  my-4 flex-column gx-0">
        <Col xs={12} className="flex-column">
          <h2>Pending Requests</h2>
          <ListGroup className="w-100 mt-3">
            {participationRequests?.length > 0 ? (
              participationRequests.map((req) => (
                <ListGroup.Item
                  key={req.participationId}
                  className="pending-list-item"
                >
                  <Row className="align-items-center flex-column">
                    <Col className="flex-row">
                      <Link
                        to={`/private/profile/${req.user.userId}`}
                        className="d-flex align-items-center gap-2"
                      >
                        <Image
                          className="rounded-circle avatar"
                          src={req.user.profileImg || avatar_placeholder}
                          alt="avatar"
                          height={30}
                          width={30}
                        />
                        <h3 className="mb-0">{req.user.username}</h3>
                      </Link>
                    </Col>
                    <Col className="text-end">
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => {
                          dispatch(
                            manageParticipationsRequests(
                              req.participationId,
                              "ACCEPTED",
                              req.eventId,
                            ),
                          );
                        }}
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        className="ms-2"
                        onClick={() => {
                          dispatch(
                            manageParticipationsRequests(
                              req.participationId,
                              "REJECTED",
                              req.eventId,
                            ),
                          );
                        }}
                      >
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
