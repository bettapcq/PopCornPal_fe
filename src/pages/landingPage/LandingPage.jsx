import { Col, Container, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import LoginModal from "../../components/modals/loginModal/LoginModal";
import "./LandingPage.scss";
import RegisterModal from "../../components/modals/registerModal/RegisterModal";
import spaceVideo from "../../assets/videos/space.mp4";
import logoFull from "../../assets/img/logo-full.png";

function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <Container className="pt-5" fluid>
      {/* video background */}
      <div className="video-wrapper">
        <video autoPlay muted loop className="background-video">
          <source src={spaceVideo} type="video/mp4" />
        </video>
        <div className="video-fade"></div>
      </div>
      <Row className="justify-content-center">
        <Col className="text-center">
          <Image className="logo-full" src={logoFull} alt="logo full" fluid />
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center mt-2 d-flex flex-column">
        <Col className="text-center ">
          <Button
            className="landing-btn"
            variant="secondary"
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
      <RegisterModal
        show={showRegister}
        handleClose={() => setShowRegister(false)}
      />
    </Container>
  );
}

export default LandingPage;
