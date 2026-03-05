import { Container, Row, Col, Navbar, Nav, ListGroup } from "react-bootstrap";

function Footer() {
  return (
    <Container className="my-footer pt-3" fluid>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <p className="text-secondary text-center">&copy;PopCornPal - 2026</p>
          <p className="text-secondary text-center">
            Created By Elisabetta Piacquadio
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
