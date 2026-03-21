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
  const [loadingNear, setLoadingNear] = useState(false);
  const [loadingFiltered, setLoadingFiltered] = useState(false);
  const nearEvents = useSelector(
    (state) => state.events.homeEvents?.nearEvents,
  );

  const filteredEvents = useSelector(
    (state) => state.events.homeEvents?.filteredEvents,
  );

  const [fallbackEvents, setFallbackEvents] = useState([]);

  useEffect(() => {
    const fetchNear = async () => {
      setLoadingNear(true);
      try {
        await dispatch(getEventsNearMe());
      } finally {
        setLoadingNear(false);
      }
    };

    fetchNear();
  }, [dispatch]);

  useEffect(() => {
    const fetchFiltered = async () => {
      setLoadingFiltered(true);
      try {
        await dispatch(getFilteredEvents());
      } finally {
        setLoadingFiltered(false);
      }
    };

    fetchFiltered();
  }, [dispatch]);

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

    setLoadingFiltered(true);

    try {
      await dispatch(getFilteredEvents(updatedFilters));
    } finally {
      setLoadingFiltered(false);
    }
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
