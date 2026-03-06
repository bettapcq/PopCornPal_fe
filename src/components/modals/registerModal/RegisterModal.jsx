import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "../registerModal/RegisterModal.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../../redux/actions/AuthActions";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function RegisterModal({ show, handleClose }) {
  const [username, setUsername] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLogged = useSelector((state) => state.auth.isLogged);
  const error = useSelector((state) => state.auth.error);

  const dispatch = useDispatch();

  const handelRegister = (e) => {
    e.preventDefault();

    dispatch(register({ username, dateOfBirth, city, email, password }));
  };

  useEffect(() => {
    if (isLogged) {
      handleClose();
      navigate("/me"); //go to personal profile after isLogged becomes true
    }
  }, [isLogged]);

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

            <Form onSubmit={handelRegister} className="d-flex flex-column">
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  className="modal-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  className="modal-input"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  className="modal-input"
                  placeholder="Your city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  className="modal-input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  className="modal-input"
                  placeholder="New password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button
                className="modal-button register-button mt-3"
                type="submit"
              >
                Save
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
