import React from "react";
import { Container, Row, Col, Button } from "reactstrap";

const Beranda = (props) => {
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <Button color="success">Success</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Beranda;
