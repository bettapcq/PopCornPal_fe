import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useState } from "react";
import {
  CLEAR_AUTH_ERROR,
  deleteAccount,
  editProfileSecurity,
  logout,
} from "../../redux/actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import { validationRules } from "../../validationRoules";
import ConfirmModal from "../../components/modals/confirmModal/ConfirmModal";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SecuritySettingsPage() {
  const message = useSelector((state) => state.auth.message);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialFormState = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    newEmail: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [formError, setFormError] = useState(null);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }

    if (!formData.newEmail && !formData.newPassword) {
      setFormError("Insert at least one field to update");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    setFormError(null);

    dispatch(editProfileSecurity(formData));
    setFormData(initialFormState);
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setValidated(false);
    setFormError(null);
    dispatch({ type: CLEAR_AUTH_ERROR });
  };

  const handleMessageTurnBack = () => {
    setFormData(initialFormState);
    setValidated(false);
    setFormError(null);
    dispatch({ type: CLEAR_AUTH_ERROR });
  };

  //delete account

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleConfirmDelete = () => {
    dispatch(deleteAccount());
    dispatch(logout());
    navigate("/");
  };

  const user = useSelector((state) => state.auth.userLogged);

  return (
    <>
      {/* loading */}
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
      {!error && !loading && (
        <Container className="mt-4">
          <Button
            variant="link"
            className="mb-3 modal-close text-start"
            onClick={() => navigate(-1)}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </Button>
          <Row className="justify-content-center">
            <Col md={10}>
              <Card>
                <Card.Body>
                  <Card.Title className="mb-4 modal-title text-start">
                    Security Settings
                  </Card.Title>

                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <Row>
                      {/* PASSWORD */}

                      <Col md={6}>
                        <h5 className="mb-3">Change Password</h5>
                        {formError && (
                          <Alert variant="danger">{formError}</Alert>
                        )}
                        <Form.Group className="mb-3">
                          <Form.Label>Current Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>New Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="newPassword"
                            onChange={handleChange}
                            value={formData.newPassword}
                            pattern={validationRules.password.pattern}
                          />
                          <Form.Control.Feedback type="invalid">
                            {validationRules.password.message}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            pattern={validationRules.password.pattern}
                            onChange={handleChange}
                          />
                          <Form.Control.Feedback type="invalid">
                            {validationRules.password.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      {/* EMAIL */}

                      <Col md={6}>
                        <h5 className="mb-3">Change Email</h5>

                        <Form.Group className="mb-3">
                          <Form.Label>New Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="newEmail"
                            value={formData.newEmail}
                            onChange={handleChange}
                          />
                          <Form.Control.Feedback type="invalid">
                            Email not valid
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <hr className="my-4" />

                    <div className="mt-3 text-center">
                      <Button type="submit" className="modal-button w-50">
                        Save Settings
                      </Button>
                    </div>
                    <Button
                      variant="link"
                      className="modal-close"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </Form>
                  <div className="text-center">
                    <Button
                      variant="danger"
                      onClick={() => setShowDeleteModal(true)}
                    >
                      Delete Account
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}

      <ConfirmModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleConfirm={handleConfirmDelete}
        confirmType="Delete account"
        variantBtn="danger"
        msg="Are you sure you want to delete your account?"
      />
    </>
  );
}

export default SecuritySettingsPage;
