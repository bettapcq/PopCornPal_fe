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
import EditProfileModal from "../modals/editProfileModal/EditProfileModal.jsx";
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
          <Row className="align-items-center g-4">
            {/* AVATAR */}
            <Col xs={12} md="auto" className="text-center">
              <Image
                src={profile?.profileImg || avatar_placeholder}
                className="avatar"
                roundedCircle
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
            <Col>
              <div className="d-flex flex-column gap-2 text-center text-md-start">
                <h2 className="profile-name m-0">{profile?.username}</h2>

                {/* rating */}
                <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2">
                  {profile?.avgRating > 0 ? (
                    <>
                      <StaticRatingStars rating={profile.avgRating} />
                      <span className="small">({profile.ratingCount})</span>
                    </>
                  ) : (
                    <span>No ratings yet</span>
                  )}
                </div>

                <hr className="my-2" />

                {/* info */}
                <div className="d-flex gap-4 justify-content-center justify-content-md-start flex-wrap">
                  <span>
                    <FontAwesomeIcon icon={faMapMarker} className="me-2" />
                    {profile?.city}
                  </span>

                  <span>
                    <FontAwesomeIcon icon={faBirthdayCake} className="me-2" />
                    {profile?.age} years
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          {/* BIO */}
          <div className="mt-4 text-center text-md-start">
            <p>{profile?.bio || "Profile Bio"}</p>
          </div>
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
