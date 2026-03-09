import { useState } from "react";
import "../hero/ProfileHero.scss";
import { Col, Row, Image, Card, CardText } from "react-bootstrap";
import { useSelector } from "react-redux";
import avatar_placeholder from "../../assets/img/avatar_placeholder.jpg";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons/faMapMarker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons";

function ProfileHero() {
  const profile = useSelector((state) => state.users.profile);

  return (
    <Card className="profile-hero">
      <Card.Body>
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
  );
}

export default ProfileHero;
