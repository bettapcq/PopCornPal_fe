import { Modal, Button, Form, Image } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { uploadProfileImage } from "../../../redux/actions/UserActions";
// import { uploadProfileImage } from "../../redux/actions/UserActions";

function UploadProfileImageModal({ show, handleClose }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar_pic", file);

    dispatch(uploadProfileImage(formData));

    handleClose();
  };

  const handleModalClose = () => {
    setFile(null);
    setPreview(null);

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Upload Profile Image</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group>
          <Form.Control
            className="modal-input file-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Form.Group>

        {preview && (
          <div className="text-center mt-3">
            <Image src={preview} roundedCircle width={120} height={120} />
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button className="modal-button" onClick={handleUpload}>
          Upload
        </Button>
        <Link className="modal-close" onClick={handleModalClose}>
          Cancel
        </Link>
      </Modal.Footer>
    </Modal>
  );
}

export default UploadProfileImageModal;
