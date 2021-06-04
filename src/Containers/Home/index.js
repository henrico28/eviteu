import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import { Wrapper } from "./style";

import illustration from "../../Assets/Image/Profile/illustration.svg";

const Home = (props) => {
  return (
    <Wrapper>
      <Container className="wrapper-home" fluid>
        <Row className="justify-content-center align-items-center wrapper-content">
          <Col md={6} className="d-flex justify-content-center">
            <img
              src={illustration}
              className="home-illustration"
              alt="invitation"
            />
          </Col>
          <Col md={6} className="home-description">
            <h3 className="description-title text-purple text-xs-center text-md-left my-3">
              EViteU
            </h3>
            <p className="description-text text-indigo text-xs-center text-md-left my-3">
              Is a website that enables you to create pages about events that
              you will be hosting and send digital invites of this events to
              your guests.
            </p>
            <div className="wrapper-description-button my-3">
              <Button tag={Link} to="signup" className="btn-indigo">
                Sign Up Now
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Home;
