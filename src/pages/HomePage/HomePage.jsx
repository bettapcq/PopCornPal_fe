import { Alert, Container, Spinner, Button } from "react-bootstrap";
import HeroSection from "../../components/heroSection/HeroSection";
import HomeEventsSection from "../../components/homeEventsSection/HomeEventsSection";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  CLEAR_EVENTS_ALERTS,
  getEventsNearMe,
  getFilteredEvents,
} from "../../redux/actions/EventActions";

function HomePage() {
  const message = useSelector((state) => state.events.message);
  const error = useSelector((state) => state.events.error);
  const dispatch = useDispatch();
  const loadingNear = useSelector((state) => state.events.loadingNear);
  const loadingFiltered = useSelector((state) => state.events.loadingFiltered);
  const nearEvents = useSelector(
    (state) => state.events.homeEvents?.nearEvents,
  );

  const filteredEvents = useSelector(
    (state) => state.events.homeEvents?.filteredEvents,
  );

  const [fallbackEvents, setFallbackEvents] = useState([]);

  useEffect(() => {
    dispatch(getEventsNearMe());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFilteredEvents());
  }, [dispatch]);

  console.log("loadingNear:", loadingNear);
  console.log("nearEvents:", nearEvents);

  // fallback to seed if no nears
  useEffect(() => {
    if (
      filteredEvents &&
      filteredEvents.length > 0 &&
      fallbackEvents.length === 0
    ) {
      setFallbackEvents(filteredEvents);
    }
  }, [filteredEvents]);

  const [filters, setFilters] = useState({});

  const handleFilter = async (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);

    dispatch(getFilteredEvents(updatedFilters));
  };

  const handleMessageTurnBack = () => {
    dispatch({ type: CLEAR_EVENTS_ALERTS });
  };

  return (
    <>
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
      <Container className="main-content mb-4" fluid>
        <HeroSection events={nearEvents?.slice(0, 3)} />
        <HomeEventsSection
          title={
            nearEvents && nearEvents.length > 3
              ? "Movie nights near you"
              : "No more events near you – discover movie nights"
          }
          events={
            nearEvents && nearEvents.length > 3
              ? nearEvents.slice(3, 9)
              : fallbackEvents.slice(0, 6)
          }
          loading={loadingNear}
        />
        <HomeEventsSection
          title="Discover movie nights"
          events={filteredEvents}
          loading={loadingFiltered}
          isFilterSection
          onFilter={handleFilter}
        />
      </Container>
    </>
  );
}

export default HomePage;
