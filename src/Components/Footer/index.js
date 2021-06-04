import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Wrapper } from "./style";

const Footer = (props) => {
  return (
    <Wrapper>
      <Container className="wrapper-footer bg-indigo shadow-lg" fluid>
        <Row>
          <Col>
            <h1 className="text-center text-white footer-text mt-2">
              Copyright © EViteU 2021
            </h1>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Footer;
