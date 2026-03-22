import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { CLEAR_AUTH_ERROR, login } from "../../../redux/actions/AuthActions";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RESET_PASSWORD_CLOSE } from "../../../redux/actions/AuthActions";
import ResetPasswordModal from "../resetPwdModal/ResetPasswordModal";

function LoginModal({ show, handleClose }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const error = useSelector((state) => state.auth.error);
  const message = useSelector((state) => state.auth.message);
  const isLogged = useSelector((state) => state.auth.isLogged);
  const user = useSelector((state) => state.users.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("isLogged:", isLogged);
    console.log("USER FROM STORE:", user);

    if (isLogged && user) {
      handleClose();

      navigate(`/private/profile`); //go to profile page after isLogged becomes true
    }
  }, [isLogged, user, handleClose, navigate]);

  console.log("PROFILE:", user);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setLoading(true);

      try {
        await dispatch(login(email, password));
      } finally {
        setLoading(false);
      }
    }

    setValidated(true);
  };

  const handleCloseLogin = () => {
    setEmail("");
    setPassword("");
    dispatch({ type: CLEAR_AUTH_ERROR });
    setValidated(false);
    handleClose();
  };

  const handleOpenReset = () => {
    dispatch({ type: RESET_PASSWORD_CLOSE });
    handleClose();
    setShowReset(true);
  };

  const handleCloseReset = () => {
    setShowReset(false);
  };

  const handleMessageTurnBack = () => {
    dispatch({ type: CLEAR_AUTH_ERROR });
  };

  return (
    <>
      {loading && <Spinner variant="primary" animation="grow" />}
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
              onClick={handleCloseLogin}
            >
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Reset Password Modal */}

      <ResetPasswordModal show={showReset} handleClose={handleCloseReset} />
    </>
  );
}

export default LoginModal;
