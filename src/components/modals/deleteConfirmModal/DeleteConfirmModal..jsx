import { Modal, Button } from "react-bootstrap";

function DeleteConfirmModal({ show, handleClose, handleConfirm, itemName }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete {itemName}</Modal.Title>
      </Modal.Header>

      <Modal.Body>Are you sure you want to delete this {itemName}?</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>

        <Button variant="danger" onClick={handleConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmModal;
