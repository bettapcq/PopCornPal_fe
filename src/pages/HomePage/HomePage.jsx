import { Alert, Container, Spinner, Button } from "react-bootstrap";
import HeroSection from "../../components/heroSection/HeroSection";
import HomeEventsSection from "../../components/homeEventsSection/HomeEventsSection";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  CLEAR_EVENTS_ALERTS,
  getEventsNearMe,
  getFilteredEvents,
} from "../../redux/actions/EventActions";

function HomePage() {
  const message = useSelector((state) => state.events.message);
  const loading = useSelector((state) => state.events.loading);
  const error = useSelector((state) => state.events.error);
  const dispatch = useDispatch();
  const nearEvents = useSelector(
    (state) => state.events.homeEvents?.nearEvents,
  );

  const filteredEvents = useSelector(
    (state) => state.events.homeEvents?.filteredEvents,
  );

  console.log("FILTERED EVENTS: ", filteredEvents);
  console.log("NEAR EVENTS: ", nearEvents);

  useEffect(() => {
    dispatch(getEventsNearMe());
    dispatch(getFilteredEvents());
  }, []);

  const handleMessageTurnBack = () => {
    dispatch({ type: CLEAR_EVENTS_ALERTS });
  };

  return (
    <>
      {/* loading */}
      {loading && <Spinner variant="primary" animation="grow" />}
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
      {!error && !loading && (
        <Container className="main-content mb-4" fluid>
          <HeroSection events={nearEvents?.slice(0, 3)} />
          {/* <HomeFilterBar /> */}

          <HomeEventsSection
            title="Movie nights near you"
            events={nearEvents?.slice(3, 9)}
          />
          <HomeEventsSection
            title="Discover movie nights"
            events={filteredEvents}
          />
          {/* <CreateEventCTA /> */}
        </Container>
      )}
    </>
  );
}

export default HomePage;
