import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import { Wrapper } from "./style";

import notFoundIllusatrion from "../../Assets/Image/Profile/404.svg";

const NotFound = (props) => {
  return (
    <Wrapper>
      <Container className="wrapper-notfound" fluid>
        <Row className="min-vh-100 align-items-center justify-content-center">
          <Col>
            <Row className="justify-content-center my-4">
              <img
                src={notFoundIllusatrion}
                className="notfound-illustration"
                alt="404 Illustration"
              />
            </Row>
            <Row className="justify-content-center my-4">
              <h3 className="text-center notfound-text">
                Oops! Page not Found
              </h3>
            </Row>
            <Row className="justify-content-center my-4">
              <Button tag={Link} to="/" className="btn-indigo">
                Go to Homepage
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default NotFound;
