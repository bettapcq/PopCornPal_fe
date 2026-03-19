import { useState } from "react";
import "./ProfileHero.scss";
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
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import EditProfileModal from "../modals/editProfileModal/editProfileModal.jsx";
import { useParams } from "react-router-dom";
import UploadProfileImageModal from "../modals/uploadImageProfileModal/UploadImageProfileModal.jsx";
import StaticRatingStars from "../ratingStars/StaticRatingStars.jsx";

function ProfileHero() {
  const profile = useSelector((state) => state.users.profile);
  const userLogged = useSelector((state) => state.auth.userLogged);
  const params = useParams();

  const [showEdit, setShowEdit] = useState(false);

  const handleOpen = () => setShowEdit(true);
  const handleClose = () => setShowEdit(false);

  const isMyProfile =
    !params.userId || Number(params.userId) === userLogged?.userId;

  //upload profile picture
  const [showUpload, setShowUpload] = useState(false);

  return (
    <>
      <Card className="profile-hero mt-0 mb-4 pb-4">
        <Card.Body>
          <Row>
            <Col className="text-end">
              {/* profile button edit toggle */}
              {isMyProfile && (
                <Row className="flex-row justify-content-end text-end">
                  <Col>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip id="button-tooltip-2">Edit profile</Tooltip>
                      }
                    >
                      <FontAwesomeIcon
                        as={Button}
                        onClick={handleOpen}
                        icon={faPencilAlt}
                        className="pencil-btn fs-5"
                      />
                    </OverlayTrigger>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col xs={12} md={4} className="text-center">
              <Image
                src={profile?.profileImg || avatar_placeholder}
                roundedCircle
                className="avatar p-2"
                fluid
              />
              {/* upload photo toggle */}
              {isMyProfile && (
                <Row className="flex-row justify-content-start text-start">
                  <Col>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip id="button-tooltip-2">Change photo</Tooltip>
                      }
                    >
                      <FontAwesomeIcon
                        as={Button}
                        onClick={() => setShowUpload(true)}
                        icon={faCamera}
                        className="pencil-btn fs-5"
                      />
                    </OverlayTrigger>
                  </Col>
                </Row>
              )}
            </Col>

            <Col xs={12} md={7} className="p-2 mx-2 text-center text-lg-start">
              <Card.Title className="profile-name">
                {profile?.username || "Username"}
              </Card.Title>
              <div className="p-2 mx-1 d-flex align-items-center flex-nowrap">
                {profile?.avgRating > 0 ? (
                  <>
                    <StaticRatingStars rating={profile.avgRating} />
                    {profile?.ratingCount > 0 && (
                      <span className="ms-2 fs-7">({profile.ratingCount})</span>
                    )}
                  </>
                ) : (
                  "No ratings yet"
                )}
              </div>
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
      <UploadProfileImageModal
        show={showUpload}
        handleClose={() => setShowUpload(false)}
      />
    </>
  );
}

export default ProfileHero;
