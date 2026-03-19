import { Modal, Button } from "react-bootstrap";

function ConfirmModal({
  show,
  handleClose,
  handleConfirm,
  msg,
  confirmType,
  variantBtn,
}) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{confirmType}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{msg}?</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>

        <Button variant={variantBtn} onClick={handleConfirm}>
          {confirmType}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
