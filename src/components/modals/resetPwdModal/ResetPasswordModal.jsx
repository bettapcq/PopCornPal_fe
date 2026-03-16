import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_AUTH_ERROR,
  RESET_PASSWORD_CLOSE,
  resetPassword,
} from "../../../redux/actions/AuthActions";

function ResetPasswordModal({ show, handleClose }) {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const message = useSelector((state) => state.auth.message);
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(email));
  };

  const handleCloseModal = () => {
    setEmail("");
    dispatch({ type: CLEAR_AUTH_ERROR });
    dispatch({ type: RESET_PASSWORD_CLOSE });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <h2 className="modal-title">Reset Password</h2>

        {message && <Alert variant="success">{message.message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Control
            type="email"
            placeholder="Insert your email"
            className="modal-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button className="modal-button mt-3" type="submit">
            Send reset email
          </Button>

          <Button
            type="button"
            variant="link"
            className="modal-close"
            onClick={handleCloseModal}
          >
            Close
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ResetPasswordModal;
