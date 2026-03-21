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
import { useEffect, useState } from "react";
import { validationRules } from "../../validationRoules";
import "./EventFormPage.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  createEvent,
  editEvent,
  getSingleEvent,
} from "../../redux/actions/EventActions";
import { useNavigate, useParams } from "react-router-dom";
import { CLEAR_EVENTS_ALERTS } from "../../redux/actions/EventActions";
import MovieSearch from "../../components/movieSearch/MovieSearch";
import AddressSearch from "../../components/addressSearch/AddressSearch";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EventFormPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isEditForm = Boolean(params.eventId);
  const userLogged = useSelector((state) => state.auth.userLogged);

  const [loading, setLoading] = useState(false);
  const error = useSelector((state) => state.events.error);
  const message = useSelector((state) => state.events.message);
  const selectedEvent = useSelector((state) => state.events.selectedEvent);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [addressQuery, setAddressQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
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
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    //no location if online
    if (e.target.name === "eventType" && e.target.value === "ONLINE") {
      setSelectedLocation(null);
      setAddressQuery("");
      setSuggestions([]);
    }
  };

  //--- IF EDIT mode (if eventId exist on path) fetch event on page and populate form

  useEffect(() => {
    if (isEditForm) {
      dispatch(getSingleEvent(params.eventId));
    }
  }, [params.eventId]);

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (isEditForm && selectedEvent && !initialized) {
      setFormData({
        title: selectedEvent.title,
        description: selectedEvent.description,
        dateTime: selectedEvent.eventDateTime,
        eventType: selectedEvent.eventType,
        language: selectedEvent.language,
        imdbID: selectedEvent.movie.imdbID,
        maxParticipants: selectedEvent.maxParticipants,
        location: selectedEvent.location || null,
        address: selectedEvent.address || "",
      });

      //refetch movie to populate movie input
      setSelectedMovie(selectedEvent.movie);

      // refetch the location to populate location input
      setSelectedLocation(selectedEvent.location || null);
      if (selectedEvent.location) {
        setAddressQuery(
          `${selectedEvent.location.country},${selectedEvent.location.city}`,
        );
      } else {
        setSelectedMovie(null);
        setSelectedLocation(null);
        setAddressQuery("");
      }
    }
  }, [isEditForm, selectedEvent, initialized]);

  //----------SUBMIT

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        imdbID: selectedMovie?.imdbID || formData.imdbID,
      };

      if (!selectedMovie) {
        alert("Please select a movie");
        return;
      }

      if (formData.eventType === "IN_PERSON" && !selectedLocation) {
        alert("Please select a valid address from the suggestions");
        return;
      }

      const form = e.currentTarget;

      if (!form.checkValidity()) {
        setValidated(true);
        return;
      }

      const finalLocation =
        formData.eventType === "IN_PERSON"
          ? selectedLocation || selectedEvent?.location
          : null;

      let result;

      if (isEditForm) {
        result = await dispatch(
          editEvent(params.eventId, {
            ...payload,
            location: finalLocation,
          }),
        );
      } else {
        result = await dispatch(
          createEvent({
            ...payload,
            location: finalLocation,
          }),
        );
      }

      if (result) {
        navigate(`/private/event/${result.eventId}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // 🔥 SEMPRE
    }
  };

  //--- mini modal turn back button

  const handleMessageTurnBack = () => {
    dispatch({ type: CLEAR_EVENTS_ALERTS });
    navigate(`/private/profile/${userLogged.userId}`);
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
      {loading && <Spinner variant="primary" animation="grow" />}
      {/* no loading e no error build omponent */}
      {!error && !loading && (
        <Container className="py-4 mb-4" fluid>
          <Button
            variant="link"
            className="mb-3 modal-close text-start"
            onClick={() => navigate(-1)}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </Button>
          <Card className="event-form-card">
            <Card.Body>
              <h2 className="mb-4">
                {isEditForm ? "Edit Event" : "Create Event"}
              </h2>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Event Title</Form.Label>
                  <Form.Control
                    name="title"
                    placeholder="Movie night..."
                    value={formData.title}
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
                    value={formData.description}
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
                      value={formData.dateTime}
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
                      value={formData.maxParticipants}
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
                  <Form.Select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                  >
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
                  <Form.Select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                  >
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
                {/*  search movie logic */}
                <Form.Group className="mb-3">
                  <Form.Label>Movie</Form.Label>
                  <MovieSearch
                    key={selectedMovie?.imdbID || "empty"}
                    initialValue={
                      selectedMovie?.Title || selectedEvent?.movie?.Title
                    }
                    onSelect={(movie) => {
                      setSelectedMovie(movie);
                      setFormData((prev) => ({
                        ...prev,
                        imdbID: movie.imdbID,
                      }));
                    }}
                  />
                </Form.Group>
                {/* location logic */}
                {formData.eventType === "IN_PERSON" && (
                  <Form.Group className="mb-3 mt-2">
                    <Form.Label>Event City</Form.Label>
                    <AddressSearch
                      value={addressQuery}
                      onSelect={(location, formatted) => {
                        console.log("NEW LOCATION:", location);
                        setSelectedLocation(location);
                        setAddressQuery(formatted);
                      }}
                    />
                  </Form.Group>
                )}
                {formData.eventType === "IN_PERSON" && (
                  <Form.Group className="mb-3">
                    <Form.Label>Event Address (private)</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      placeholder="e.g. Via Roma 10, interno 3"
                      value={formData.address}
                      onChange={handleChange}
                      maxLength={100}
                    />
                    <Form.Text className="text-muted">
                      This address will be visible only to participants 3 days
                      before the event
                    </Form.Text>
                  </Form.Group>
                )}
                {/* TODO: add policy select? */}
                <Button variant="primary" className="w-100" type="submit">
                  {isEditForm ? "Edit" : "Create"}
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
