import "./EventPage.scss";
import { Container, Button, Spinner, Alert, Row, Col } from "react-bootstrap";
import {
  CLEAR_EVENTS_ALERTS,
  deleteEvent,
  getSingleEvent,
} from "../../redux/actions/EventActions";
import EventDetailCard from "../../components/eventCards/eventDetailCard/EventDetailCard";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "../../components/modals/deleteConfirmModal/ConfirmModal.";
import PendingRequestsSection from "../../components/pendingRequestsSection/PendingRequestsSection";
import {
  getParticipationRequests,
  joinEvent,
  leaveEvent,
} from "../../redux/actions/ParticipationActions";
import ParticipantsSection from "../../components/participantsSection/ParticipantsSection";

function EventPage() {
  const params = useParams();
  const currentEventId = params.eventId;
  const dispatch = useDispatch();
  const currentEvent = useSelector((state) => state.events.selectedEvent);
  const participationStatus = currentEvent?.userParticipationStatus;
  const loading = useSelector((state) => state.events.loading);
  const error = useSelector((state) => state.events.error);
  const userLogged = useSelector((state) => state.auth.userLogged);
  const navigate = useNavigate();
  const message = useSelector((state) => state.events.message);
  const pendingReqList = useSelector((state) => state.participations.requests);
  let date = null;

  const isCreator =
    Number(userLogged?.userId) === Number(currentEvent?.creator?.userId);

  console.log("EVENT ID:", currentEventId);
  console.log("CURRENT EVENT: ", currentEvent);

  //dispatch details
  useEffect(() => {
    if (!message) {
      dispatch(getSingleEvent(currentEventId));
      if (isCreator) {
        dispatch(getParticipationRequests(currentEventId));
      }
    }
  }, [currentEventId, dispatch, isCreator]);

  const isFull = currentEvent?.reservedSpots >= currentEvent?.maxParticipants;

  //Join:
  const [showJoinModal, setShowJoinModal] = useState(false);
  const handleOpenJoin = () => setShowJoinModal(true);
  const handleCloseJoin = () => setShowJoinModal(false);

  const handleJoin = async () => {
    await dispatch(joinEvent(currentEventId));
    await dispatch(getSingleEvent(currentEventId));
    setShowJoinModal(false);
  };

  if (currentEvent?.eventDateTime) {
    date = new Date(currentEvent?.eventDateTime);
  }
  const isPastEvent = date && date < new Date();

  console.log("STATUS: ", participationStatus);
  console.log("USER LOGGED:", userLogged);
  console.log("EVENT CREATOR:", currentEvent?.creator);
  console.log("IS CREATOR:", isCreator);
  console.log("PENDING REQUESTS: ", pendingReqList);

  //Leave:

  const participationId = currentEvent?.participants?.find(
    (p) => p.user.userId === userLogged.userId,
  )?.participationId;

  const handleLeave = async () => {
    await dispatch(leaveEvent(participationId));
    await dispatch(getSingleEvent(currentEventId));
  };

  //Delete:
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleOpenDelete = () => setShowDeleteModal(true);
  const handleCloseDelete = () => setShowDeleteModal(false);

  const handleDeleteEvent = () => {
    dispatch(deleteEvent(currentEventId));
    setShowDeleteModal(false);
    dispatch(getSingleEvent(currentEventId));
  };

  const handleMessageTurnBack = () => {
    dispatch({ type: CLEAR_EVENTS_ALERTS });
  };

  return (
    <>
      {/* loading */}
      {loading && <Spinner variant="info" animation="radius" />}
      {message && (
        <Alert variant="success" className="my-alert">
          {message}{" "}
          <Button
            variant="link"
            className="modal-link"
            onClick={handleMessageTurnBack}
          >
            Turn back
          </Button>
        </Alert>
      )}
      {/* error */}
      {error && (
        <Alert variant="danger" className="my-alert">
          {error}{" "}
          <Button
            variant="link"
            className="modal-link"
            onClick={handleMessageTurnBack}
          >
            Turn back
          </Button>
        </Alert>
      )}
      {/* no loading e no error build omponent */}
      {!error && !loading && currentEvent && (
        <Container className="event-detail-container w-100" fluid>
          <Row className="w-100 justify-content-center">
            <Col xs={12} lg={8}>
              <Row>
                {/* SECTION DETAILS */}
                <Col xs={12}>
                  <EventDetailCard
                    currentEvent={currentEvent}
                    isCreator={isCreator}
                    isPastEvent={isPastEvent}
                    participationStatus={participationStatus}
                    isFull={isFull}
                    date={date}
                    handleOpenJoin={handleOpenJoin}
                    handleOpenDelete={handleOpenDelete}
                    handleLeave={handleLeave}
                  />
                </Col>{" "}
                {/* SECTION PARTICIPANTS */}
                <Col>
                  <ParticipantsSection
                    isCreator={isCreator}
                    currentEvent={currentEvent}
                  />
                </Col>
              </Row>
            </Col>
            {isCreator && (
              <Col xs={4}>
                {/* SECTION REQUESTS */}
                <PendingRequestsSection />
                {/* SECTION MESSAGES */}
              </Col>
            )}

            <ConfirmModal
              show={showDeleteModal}
              handleClose={handleCloseDelete}
              handleConfirm={handleDeleteEvent}
              confirmType="Delete event"
              variantBtn="danger"
              msg="Are you sure do you want to delete this event?"
            />
            <ConfirmModal
              show={showJoinModal}
              handleClose={handleCloseJoin}
              handleConfirm={handleJoin}
              confirmType="Join event"
              variantBtn="success"
              msg="Do you want to join this event?"
            />
          </Row>
        </Container>
      )}
    </>
  );
}

export default EventPage;
