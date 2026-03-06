import { Container, Row, Col } from "react-bootstrap";
import "./Footer.scss";

function Footer() {
  return (
    <Container className="my-footer pt-3" fluid>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <p className="text-light text-center fs-7">&copy;PopCornPal - 2026</p>
          <p className="text-light text-center fs-7">
            Created By Elisabetta Piacquadio
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
