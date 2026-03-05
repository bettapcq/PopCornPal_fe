import { Col, Container, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import LoginModal from "./LoginModal";

function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <Container className="pt-5" fluid>
      <Row className="justify-content-center">
        <Col className="text-center">
          <Image
            className="logo-full"
            src="/src/assets/img/LogoFull.png"
            alt="logo full"
            fluid
          />
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center mt-2 d-flex flex-column">
        <Col className="text-center ">
          <Button
            className="landing-btn"
            variant="primary"
            size="lg"
            onClick={() => setShowLogin(true)}
          >
            Login
          </Button>
          <Col className="my-3">
            <Button
              className="landing-btn"
              variant="secondary"
              size="lg"
              onClick={() => setShowRegister(true)}
            >
              Join us!
            </Button>
          </Col>
        </Col>
      </Row>
      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
    </Container>
  );
}

export default LandingPage;
