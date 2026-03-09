import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { editProfileDetails } from "../../../redux/actions/UserActions";

function EditProfileModal({ handleClose }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.users.profile);

  const [formData, setFormData] = useState({
    username: "",
    city: "",
    dateOfBirth: "",
    bio: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || "",
        city: profile.city || "",
        dateOfBirth: profile.dateOfBirth || "",
        bio: profile.bio || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    //if input doesn't change, input will not be in the patch body
    const updatedFields = {};

    if (formData.username !== profile.username) {
      updatedFields.username = formData.username;
    }

    if (formData.city !== profile.city) {
      updatedFields.city = formData.city;
    }

    if (formData.dateOfBirth !== profile.dateOfBirth) {
      updatedFields.dateOfBirth = formData.dateOfBirth;
    }

    if (formData.bio !== profile.bio) {
      updatedFields.bio = formData.bio;
    }

    //if updatedField is empty, no patch
    if (Object.keys(updatedFields).length === 0) {
      handleClose();
      return;
    }

    dispatch(editProfileDetails(updatedFields));

    handleClose();
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Edit profile</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="modal-text">Username</Form.Label>
            <Form.Control
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="modal-input"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="modal-input"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date of birth</Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              className="modal-input"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="modal-input"
            />
          </Form.Group>

          <Button type="submit" className="modal-button">
            Save
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
    </>
  );
}

export default EditProfileModal;
