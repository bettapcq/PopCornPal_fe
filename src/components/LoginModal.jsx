import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";

function LoginModal({ show, handleClose }) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={true}
      className="login-modal"
    >
      <Modal.Body className="modal-body">
        <h2 className="modal-title">Hey you!</h2>

        <Form>
          <Form.Group className="mb-4">
            <Form.Control
              type="email"
              placeholder="Email"
              className="modal-input"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              type="password"
              placeholder="Password"
              className="modal-input"
            />
          </Form.Group>

          <Button className="modal-button">Login</Button>
          <Button variant="link" className="modal-close" onClick={handleClose}>
            Close
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}


export default LoginModal;
