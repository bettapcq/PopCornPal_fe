import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/actions/AuthActions";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { resetPassword } from "../../../redux/actions/AuthActions";
import { useNavigate } from "react-router-dom";
import { RESET_PASSWORD_CLOSE } from "../../../redux/actions/AuthActions";

function LoginModal({ show, handleClose }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [showReset, setShowReset] = useState(false);

  const error = useSelector((state) => state.auth.error);
  const isLogged = useSelector((state) => state.auth.isLogged);
  const message = useSelector((state) => state.auth.message);
  const user = useSelector((state) => state.users.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("isLogged:", isLogged);
    console.log("USER FROM STORE:", user);

    if (isLogged && user) {
      handleClose();

      // !!!!!  TODO: decide where to navigate after login, maybe to the profile page or to the home page

      navigate(`/private/profile`); //go to profile page after isLogged becomes true
    }
  }, [isLogged, user, handleClose, navigate]);

  console.log("PROFILE:", user);

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

  const handleResetPassword = (e) => {
    e.preventDefault();
    dispatch(resetPassword(resetEmail));
  };

  const handleCloseReset = () => {
    dispatch({ type: RESET_PASSWORD_CLOSE });
    setShowReset(false);
    setResetEmail("");
  };

  const handleOpenReset = () => {
    dispatch({ type: RESET_PASSWORD_CLOSE });
    handleClose();
    setShowReset(true);
  };

  return (
    <>
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
            <Button
              variant="link"
              className="modal-link"
              onClick={handleOpenReset}
            >
              Forgot password?
            </Button>

            <Button className="modal-button" type="submit">
              Login
            </Button>

            <Button
              type="button"
              variant="link"
              className="modal-close"
              onClick={handleClose}
            >
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Reset Password Modal */}

      <Modal show={showReset} onHide={handleCloseReset} centered>
        <Modal.Body>
          <h4>Reset password</h4>

          {message && <Alert variant="success">{message.message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleResetPassword}>
            <Form.Control
              type="email"
              placeholder="Insert your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
            />

            <Button className="mt-3" type="submit">
              Send reset email
            </Button>

            <Button
              type="button"
              variant="link"
              className="modal-close"
              onClick={handleCloseReset}
            >
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginModal;
