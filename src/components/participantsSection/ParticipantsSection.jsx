import "./ParticipantsSection.scss";
import { Container, Row, Col, Button, Image, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import avatar_placeholder from "../../assets/img/avatar_placeholder.jpg";
import { manageParticipationsRequests } from "../../redux/actions/ParticipationActions";

function ParticipantsSection({ isCreator }) {
  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) => state.events.selectedEvent);

  return (
    <Container fluid>
      <Row className="glass-section  my-4 flex-column gx-0">
        <Col xs={12} className="flex-column">
          <h2>Participants</h2>
          <ListGroup className="w-100 mt-3">
            {selectedEvent?.participants?.length > 0 ? (
              selectedEvent?.participants?.map((p) => (
                <ListGroup.Item
                  key={p.participationId}
                  className="participant-list-item"
                >
                  {console.log("participant", p)}
                  <Row className="align-items-center">
                    <Col className="flex-row">
                      <Link
                        to={`/private/profile/${p.userId}`}
                        className="d-flex align-items-center gap-2"
                      >
                        <Image
                          className="rounded-circle avatar"
                          src={p.profileImg || avatar_placeholder}
                          alt="avatar"
                          height={30}
                          width={30}
                        />
                        <h3 className="mb-0">{p.username}</h3>
                      </Link>
                    </Col>

                    {isCreator && (
                      <Col className="text-end">
                        <Button
                          size="sm"
                          variant="danger"
                          className="ms-2"
                          onClick={() => {
                            dispatch(
                              manageParticipationsRequests(
                                p.participationId,
                                "PENDING",
                                selectedEvent?.eventId,
                              ),
                            );
                          }}
                        >
                          Remove Participant
                        </Button>
                      </Col>
                    )}
                  </Row>
                </ListGroup.Item>
              ))
            ) : (
              <p className="text-center no-content-text m-3">
                No participants yet
              </p>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default ParticipantsSection;
