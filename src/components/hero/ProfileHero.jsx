import { useState } from "react";
import "../hero/ProfileHero.scss";
import {
  Col,
  Row,
  Image,
  Card,
  Button,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import avatar_placeholder from "../../assets/img/avatar_placeholder.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBirthdayCake,
  faPencilAlt,
  faMapMarker,
  faStar,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import EditProfileModal from "../modals/editProfileModal/editProfileModal.jsx";

function ProfileHero() {
  const profile = useSelector((state) => state.users.profile);
  const [showEdit, setShowEdit] = useState(false);

  const handleOpen = () => setShowEdit(true);
  const handleClose = () => setShowEdit(false);

  return (
    <>
      <Card className="profile-hero mt-0 mb-4 pb-4">
        <Card.Body>
          <Row>
            <Col className="text-end">
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id="button-tooltip-2">Edit profile</Tooltip>}
              >
                <FontAwesomeIcon
                  as={Button}
                  onClick={handleOpen}
                  icon={faPencilAlt}
                  className="pencil-btn "
                />
              </OverlayTrigger>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col xs={12} md={3} className="text-center">
              <Image
                src={profile?.profileImg || avatar_placeholder}
                roundedCircle
                className="avatar p-3 "
                width={200}
              />
            </Col>

            <Col xs={12} md={9} className="p-4 text-center text-lg-start">
              <Card.Title className="profile-name">
                {profile?.username || "Username"}
              </Card.Title>
              <Card.Text xs={3} className="d-flex text-nowrap p-4">
                <FontAwesomeIcon icon={faStar} className="star" />
                <FontAwesomeIcon icon={faStar} className="star" />
                <FontAwesomeIcon icon={faStar} className="star" />
                <FontAwesomeIcon icon={faStar} className="star" />
                <FontAwesomeIcon icon={faStarHalfStroke} className="star" />
              </Card.Text>
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
              <Card.Text className="profile-bio m-4 p-4">
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
