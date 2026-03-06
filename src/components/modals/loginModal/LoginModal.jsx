import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/actions/AuthActions";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function LoginModal({ show, handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);

  const error = useSelector((state) => state.auth.error);
  const isLogged = useSelector((state) => state.auth.isLogged);

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      dispatch(login(email, password));
    }

    setValidated(true);
  };

  useEffect(() => {
    if (isLogged) {
      handleClose();
      navigate("/home"); //go to home page after isLogged becomes true
    }
  }, [isLogged]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={true}
    >
      <Modal.Body className="modal-body">
        <h2 className="modal-title">Hey you!</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form
          noValidate
          validated={validated}
          onSubmit={handleLogin}
          className="d-flex flex-column"
        >
          <Form.Group className="mb-4">
            <Form.Control
              type="email"
              placeholder="Email"
              className="modal-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Email is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              type="password"
              placeholder="Password"
              className="modal-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Password is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Button className="modal-button" type="submit">
            Login
          </Button>
          <Button variant="link" className="modal-close" onClick={handleClose}>
            Close
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
