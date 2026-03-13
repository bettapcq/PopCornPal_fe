import {
  Container,
  Card,
  Form,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useState } from "react";
import { validationRules } from "../../validationRoules";
import "./EventFormPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../../redux/actions/EventActions";
import { useNavigate } from "react-router-dom";
import { CLEAR_EVENTS_ALERTS } from "../../redux/actions/EventActions";

function EventFormPage() {
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.auth.userLogged);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dateTime: "",
    eventType: "IN_PERSON",
    language: "EN",
    imdbID: "",
    maxParticipants: 2,
    location: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // -----------GEOAPIFY FETCH FOR AUTOCOMPLETE SEARCH AND SEND LOCATION

  const [addressQuery, setAddressQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const token = localStorage.getItem("token");
  const loading = useSelector((state) => state.events.loading);
  const error = useSelector((state) => state.events.error);
  const message = useSelector((state) => state.events.message);
  const navigate = useNavigate();

  const handleSelectAddress = (item) => {
    const p = item.properties;

    setSelectedLocation({
      street: p.street || "",
      civicNumber: p.housenumber || "",
      city: p.city || p.town || "",
      country: p.country,
      latitude: p.lat,
      longitude: p.lon,
    });

    setAddressQuery(p.formatted);
    setSuggestions([]);
  };

  const fetchAddressSearch = async (value) => {
    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:7001/locations/autocomplete?text=${encodeURIComponent(value)}`, //encodeURIComponent to normalize string (ex: via roma 12 -> via%20roma%2012)
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();
      setSuggestions(data.features || []);
    } catch (err) {
      console.error("Address search error:", err);
    }
  };

  //----------SUBMIT

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.eventType === "IN_PERSON" && !selectedLocation) {
      alert("Please select a valid address from the suggestions");
      return;
    }

    const form = e.currentTarget;

    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }

    const result = await dispatch(
      createEvent({
        ...formData,
        location: selectedLocation,
      }),
    );

    if (result) {
      navigate(`/private/event/${result.eventId}`);
    }
  };

  const handleMessageTurnBack = () => {
    dispatch({ type: CLEAR_EVENTS_ALERTS });
    navigate(`/private/profile/${userLogged.userId}`);
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
      {!error && !loading && (
        <Container className="py-4 mb-4" fluid>
          <Card className="event-form-card">
            <Card.Body>
              <h2 className="mb-4">Create New Event</h2>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Event Title</Form.Label>
                  <Form.Control
                    name="title"
                    placeholder="Movie night..."
                    onChange={handleChange}
                    minLength={2}
                    maxLength={40}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationRules.title.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Join with me.."
                    rows={3}
                    name="description"
                    minLength={2}
                    maxLength={150}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationRules.description.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Row className="mb-3">
                  <Col>
                    <Form.Label>Date & Time</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="dateTime"
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {validationRules.dateTime.message}
                    </Form.Control.Feedback>
                  </Col>
                  <Col>
                    <Form.Label>Max Participants</Form.Label>
                    <Form.Control
                      type="number"
                      name="maxParticipants"
                      min={2}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {validationRules.maxParticipants.message}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Event Type</Form.Label>
                  <Form.Select name="eventType" onChange={handleChange}>
                    <option value="IN_PERSON">In Person</option>
                    <option value="ONLINE" required>
                      Online
                    </option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {"Select an event type"}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Language</Form.Label>
                  <Form.Select name="language" onChange={handleChange}>
                    <option value="EN" required>
                      EN
                    </option>
                    <option value="IT"> IT</option>
                    <option value="ES">ES</option>
                    <option value="FR">FR</option>
                    <option value="DE">DE</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {"Select an event type"}
                  </Form.Control.Feedback>
                </Form.Group>
                {/* TODO: add search movie logic */}
                <Form.Group className="mb-3">
                  <Form.Label>Movie IMDb ID</Form.Label>
                  <Form.Control
                    name="imdbID"
                    placeholder="tt1375666"
                    onChange={handleChange}
                  />
                </Form.Group>
                {/* location logic */}
                {formData.eventType === "IN_PERSON" && (
                  <Row className="mb-3 mt-2 g-4 address-autocomplete">
                    <Form.Label className="mt-4 mb-0">
                      Event Location
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Search address"
                      value={addressQuery}
                      onChange={(e) => {
                        const value = e.target.value;
                        setAddressQuery(value);
                        setSelectedLocation(null);
                        fetchAddressSearch(value);
                      }}
                    />
                    {suggestions.length > 0 && (
                      <div className="autocomplete-list">
                        {suggestions.map((item) => (
                          <div
                            key={item.properties.place_id}
                            className="autocomplete-item"
                            onClick={() => handleSelectAddress(item)}
                          >
                            {item.properties.formatted}
                          </div>
                        ))}
                      </div>
                    )}
                  </Row>
                )}
                {/* TODO: add policy select */}
                <Button variant="primary" className="w-100" type="submit">
                  Create Event
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      )}{" "}
    </>
  );
}

export default EventFormPage;
