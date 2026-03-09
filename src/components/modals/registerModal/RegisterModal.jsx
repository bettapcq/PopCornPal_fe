import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Alert,
  InputGroup,
} from "react-bootstrap";
import "../registerModal/RegisterModal.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../../redux/actions/AuthActions";
import { useEffect } from "react";
import { validationRules } from "../../../validationRoules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RegisterModal({ show, handleClose }) {
  const [username, setUsername] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const isLogged = useSelector((state) => state.auth.isLogged);
  const error = useSelector((state) => state.auth.error);
  const [validated, setValidated] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handelRegister = (e) => {
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();

      console.log({
        "REGISTER MODAL INPUTS": {
          username,
          dateOfBirth,
          city,
          email,
          password,
        },
      });

      dispatch(register({ username, dateOfBirth, city, email, password }));
    }

    setValidated(true);
  };

  useEffect(() => {
    if (isLogged && user) {
      handleClose();
      navigate(`/private/profile`); //go to personal profile after isLogged becomes true
    }
  }, [isLogged, user]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      className="register-modal"
      size="lg"
    >
      <Modal.Body>
        <Row className="justify-content-between align-items-center register-layout">
          {/* form */}
          <Col xs={12} md={6} className="register-form order-2 order-md-1">
            <h2 className="modal-title mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form
              noValidate
              validated={validated}
              onSubmit={handelRegister}
              className="d-flex flex-column"
            >
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  className="modal-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength={validationRules.username.minLength}
                  maxLength={validationRules.username.maxLength}
                />

                <Form.Control.Feedback type="invalid">
                  {validationRules.username.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  className="modal-input"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {validationRules.dateOfBirth.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  className="modal-input"
                  placeholder="Your city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  minLength={validationRules.city.minLength}
                  maxLength={validationRules.city.maxLength}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {validationRules.city.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  className="modal-input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Email not valid
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <InputGroup>
                  <Form.Control
                    className="modal-input"
                    placeholder="New password"
                    type={showPassword ? "password" : "text"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    pattern={validationRules.password.pattern}
                    required
                  />

                  <InputGroup.Text
                    onClick={togglePassword}
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? (
                      <FontAwesomeIcon icon={["fas", "eye-slash"]} />
                    ) : (
                      <FontAwesomeIcon icon={["fas", "eye"]} />
                    )}
                  </InputGroup.Text>
                </InputGroup>

                <Form.Control.Feedback type="invalid">
                  {validationRules.password.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                className="modal-button register-button mt-3"
                type="submit"
              >
                Save
              </Button>
              <Button
                variant="link"
                className="modal-close"
                onClick={handleClose}
              >
                Close
              </Button>
            </Form>
          </Col>

          {/* aside text */}
          <Col xs={12} md={5} className="register-info order-1 order-md-3">
            <h2>Join our community!</h2>
            <p>It takes 5 minutes!</p>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default RegisterModal;
