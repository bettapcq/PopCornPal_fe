import {
  Container,
  Row,
  Col,
  Alert,
  Button,
  Spinner,
  Dropdown,
} from "react-bootstrap";
import EventXsCard from "../eventCards/eventXsCard/EventXsCard";
import "./HomeEventsSection.scss";
import { CLEAR_EVENTS_ALERTS } from "../../redux/actions/EventActions";
import { useDispatch, useSelector } from "react-redux";
import AddressSearch from "../addressSearch/AddressSearch";
import { useEffect, useState } from "react";

function HomeEventsSection({
  title,
  events,
  loading,
  onFilter,
  isFilterSection,
}) {
  const message = useSelector((state) => state.events.message);
  const error = useSelector((state) => state.events.error);
  const dispatch = useDispatch();

  // filtering dropdown
  const [cityQuery, setCityQuery] = useState("");
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

  const handleMessageTurnBack = () => {
    dispatch({ type: CLEAR_EVENTS_ALERTS });
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
                          onClick={() => onFilter("eventType", option.value)}
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
                          onClick={() => onFilter("language", option.value)}
                        >
                          {option.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>

                  {/* city */}
                  <div className="city-filter-wrapper">
                    <AddressSearch
                      value={cityQuery}
                      onSelect={(location, formatted) => {
                        setCityQuery(formatted);
                        onFilter("city", location.city);
                      }}
                    />
                  </div>
                </div>
              </Col>
            )}
          </Row>
          <Row className="events-row g-3 mt-2">
            {loading ? (
              <Col className="text-center py-4">
                <Spinner animation="grow" variant="primary" />
              </Col>
            ) : events?.length > 0 ? (
              events.map((event) => (
                <Col md={4} lg={6} key={event.eventId}>
                  <EventXsCard event={event} />
                </Col>
              ))
            ) : isFilterSection ? (
              <Col>
                <p className="no-content-text">No results</p>
              </Col>
            ) : null}
          </Row>
        </Container>
      )}
    </>
  );
}

export default HomeEventsSection;
