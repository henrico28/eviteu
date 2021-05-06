import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import { Wrapper } from "./style";
import useUserData from "../../LocalStorage/useUserData";
import notFoundIllusatrion from "../../Assets/Image/Profile/404.svg";

const NotFound = (props) => {
  const history = useHistory();
  const { removeUserData } = useUserData();

  const handleHomePage = () => {
    history.push("/");
    removeUserData();
  };

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
              <Button onClick={handleHomePage} className="btn-indigo">
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
