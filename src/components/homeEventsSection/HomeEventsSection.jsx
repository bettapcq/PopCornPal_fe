import { API_URL } from "../api/api";
import {
  Container,
  Row,
  Col,
  Alert,
  Button,
  Spinner,
  Dropdown,
  Form,
} from "react-bootstrap";
import EventXsCard from "../eventCards/eventXsCard/EventXsCard";
import "./HomeEventsSection.scss";
import {
  CLEAR_EVENTS_ALERTS,
  getFilteredEvents,
} from "../../redux/actions/EventActions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

function HomeEventsSection({ title, events }) {
  const message = useSelector((state) => state.events.message);
  const loading = useSelector((state) => state.events.loading);
  const error = useSelector((state) => state.events.error);
  const dispatch = useDispatch();

  const handleMessageTurnBack = () => {
    dispatch({ type: CLEAR_EVENTS_ALERTS });
  };

  // filtering dropdown

  const filterOptions = {
    eventType: [
      { label: "Online", value: "ONLINE" },
      { label: "In person", value: "IN_PERSON" },
    ],
    language: [
      { label: "English", value: "EN" },
      { label: "Italian", value: "IT" },
      { label: "Spanish", value: "ES" },
      { label: "German", value: "DE" },
      { label: "French", value: "FR" },
    ],
  };

  const [filters, setFilters] = useState({});

  const handleFilter = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    dispatch(getFilteredEvents(updatedFilters));
  };

  //city query geoapify
  const token = localStorage.getItem("token");
  const [cityQuery, setCityQuery] = useState("");
  const [citySuggestions, setCitySuggestions] = useState([]);

  const fetchCitySearch = async (value) => {
    setCityQuery(value);

    if (value.length < 3) {
      setCitySuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/locations/autocomplete?text=${encodeURIComponent(value)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      setCitySuggestions(data.features || []);
    } catch (err) {
      console.error("City search error:", err);
    }
  };

  return (
    <>
      {error ? (
        <Alert variant="danger" className="my-alert">
          {error}
          <Button
            variant="link"
            className="modal-link"
            onClick={handleMessageTurnBack}
          >
            Turn back
          </Button>
        </Alert>
      ) : (
        <Container fluid className="glass-section home-events my-4">
          {/* loading */}
          {loading && <Spinner animation="grow" variant="primary" />}

          {/* success message */}
          {message && (
            <Alert variant="success" className="my-alert">
              {message}
              <Button
                variant="link"
                className="modal-link"
                onClick={handleMessageTurnBack}
              >
                Turn back
              </Button>
            </Alert>
          )}

          <Row xs={12} className="flex-row justify-content-between filters-row">
            <Col>
              <h2>{title}</h2>
            </Col>

            {title === "Discover movie nights" && (
              <Col xs={12} lg="auto">
                <div className="d-flex gap-2 flex-wrap">
                  {/* Event Type */}
                  <Dropdown>
                    <Dropdown.Toggle size="sm" variant="secondary">
                      Event Type
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {filterOptions.eventType.map((option) => (
                        <Dropdown.Item
                          key={option.value}
                          onClick={() =>
                            handleFilter("eventType", option.value)
                          }
                        >
                          {option.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>

                  {/* Language */}
                  <Dropdown>
                    <Dropdown.Toggle size="sm" variant="secondary">
                      Language
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {filterOptions.language.map((option) => (
                        <Dropdown.Item
                          key={option.value}
                          onClick={() => handleFilter("language", option.value)}
                        >
                          {option.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>

                  {/* city */}
                  <div className="city-filter-wrapper">
                    <Form.Control
                      type="text"
                      placeholder="Search city..."
                      value={cityQuery}
                      onChange={(e) => fetchCitySearch(e.target.value)}
                    />

                    {citySuggestions?.length > 0 && (
                      <div className="autocomplete-list">
                        {citySuggestions
                          .filter((item) => item?.properties)
                          .map((item) => (
                            <div
                              key={item.properties.place_id}
                              className="autocomplete-item"
                              onClick={() => {
                                const city = item.properties.city;
                                handleFilter("city", city);
                                setCityQuery(city);
                                setCitySuggestions([]);
                              }}
                            >
                              {item.properties.city}, {item.properties.country}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </Col>
            )}
          </Row>

          <Row className="events-row g-3 mt-2">
            {console.log("LOADING: ", loading)}
            {loading && (
              <Col className="text-center">
                <Spinner animation="grow" variant="primary" />
              </Col>
            )}

            {!loading &&
              events?.length > 0 &&
              events.map((event) => (
                <Col md={4} lg={6} key={event.eventId}>
                  <EventXsCard event={event} />
                </Col>
              ))}

            {!loading && events?.length === 0 && (
              <Col>
                <p className="no-content-text">No results found</p>
              </Col>
            )}
          </Row>
        </Container>
      )}
    </>
  );
}

export default HomeEventsSection;
