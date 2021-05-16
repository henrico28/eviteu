import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import { Wrapper } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import useUserData from "../../Hooks/useUserData";

const Error = (props) => {
  const history = useHistory();
  const { removeUserData } = useUserData();

  const handleHomePage = () => {
    history.push("/");
    removeUserData();
  };

  return (
    <Wrapper>
      <Container className="wrapper-error">
        <Row className="min-vh-100 align-items-center justify-content-center">
          <Col>
            <Row className="justify-content-center">
              <FontAwesomeIcon icon={faExclamationCircle} className="fa-10x" />
            </Row>
            <Row className="justify-content-center d-flex flex-column my-4">
              <div className="my-1">
                <h3 className="text-center error-text">
                  Oops! Something went wrong.
                </h3>
              </div>
              <div className="my-1">
                <h5 className="text-center error-subtext">
                  Please refresh the page or try again later.
                </h5>
              </div>
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

export default Error;
