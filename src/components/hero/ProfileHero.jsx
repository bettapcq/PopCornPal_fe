import { useState } from "react";
import "../hero/ProfileHero.scss";
import { Col, Row, Image, Card, Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import avatar_placeholder from "../../assets/img/avatar_placeholder.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBirthdayCake,
  faPencilAlt,
  faMapMarker,
} from "@fortawesome/free-solid-svg-icons";
import EditProfileModal from "../modals/editProfileModal/editProfileModal.jsx";

function ProfileHero() {
  const profile = useSelector((state) => state.users.profile);
  const [showEdit, setShowEdit] = useState(false);

  const handleOpen = () => setShowEdit(true);
  const handleClose = () => setShowEdit(false);

  return (
    <>
      <Card className="profile-hero">
        <Card.Body>
          <Row>
            <Col className="text-end">
              <FontAwesomeIcon
                as={Button}
                onClick={handleOpen}
                icon={faPencilAlt}
                className="pencil-btn "
              />
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col xs={12} md={3} className="text-center">
              <Image
                src={profile?.profileImg || avatar_placeholder}
                roundedCircle
                className="avatar p-3"
                fluid
              />
            </Col>

            <Col xs={12} md={9}>
              <Card.Title className="profile-name">
                {profile?.username || "Username"}
              </Card.Title>

              <div className="ratio-stars mb-2">★ ★ ★ ☆ ☆</div>

              <hr className="profile-divider my-4" />
              <Row className="align-items-center my-3">
                <Col xs={5}>
                  <Card.Subtitle className="profile-data mb-2 text-end">
                    <FontAwesomeIcon icon={faMapMarker} className="col me-2" />
                    {profile?.city || "City"}
                  </Card.Subtitle>
                </Col>
                <Col xs={5}>
                  <Card.Subtitle xs={6} className="mb-2">
                    <FontAwesomeIcon icon={faBirthdayCake} className="me-2" />
                    {profile?.age || "Age"} years
                  </Card.Subtitle>
                </Col>
              </Row>
            </Col>
            <Col>
              <Card.Text className="profile-bio m-4">
                {profile?.bio || "Profile Bio"}
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {/* edit profile modal */}
      <Modal show={showEdit} onHide={handleClose} centered>
        <EditProfileModal handleClose={handleClose} />
      </Modal>
    </>
  );
}

export default ProfileHero;
