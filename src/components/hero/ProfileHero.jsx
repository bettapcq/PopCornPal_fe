import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

function ProfileHero() {
  const profile = useSelector((state) => {
    state.users.profile;
  });
  return (
    <Card className="p-4">
      <Row className="align-items-center">
        <Col xs={12} md={3} className="text-center">
          <Image src="/profile.jpg" roundedCircle fluid />
        </Col>

        <Col xs={12} md={9}>
          <h2>Bettapcq</h2>

          <div className="mb-2">⭐ ⭐ ⭐ ⭐ ☆</div>

          <hr />

          <p>Turin · 33 years</p>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
        </Col>
      </Row>
    </Card>
  );
}

export default ProfileHero;
