import { Container, Row, Col } from "react-bootstrap";

function AsideSection() {
  return (
    <Container fluid>
      <Row className="d-flex flex-column">
        <Col>EVENTS JOINED</Col>
        <Col>PAST EVENTS</Col>
      </Row>
    </Container>
  );
}

export default AsideSection;
