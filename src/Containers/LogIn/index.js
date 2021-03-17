import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  Button,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Wrapper } from "./style";

const LogIn = (props) => {
  const [type, setType] = useState("password");

  const changeType = () => {
    setType(type === "password" ? "text" : "password");
  };
  return (
    <Wrapper>
      <Container className="wrapper-login" fluid>
        <Button
          onClick={changeType}
          className="position-absolute bg-transparent border-0 login-back-button"
          tag={Link}
          to=""
        >
          <FontAwesomeIcon icon={faTimes} size="3x" />
        </Button>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col
            className="wrapper-login-title d-flex justify-content-center align-items-center shadow-lg"
            md={5}
          >
            <h1 className="text-white text-center font-weight-bold login-title">
              EViteU
            </h1>
          </Col>
          <Col md={{ size: 5, offset: 1 }}>
            <Form>
              <FormGroup>
                <Label for="email">E-mail</Label>
                <Input type="text" name="email" placeholder="Enter Email" />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <InputGroup>
                  <Input
                    type={type}
                    name="password"
                    placeholder="Enter Password"
                  />
                  <Button
                    className="btn-indigo login-button-hide"
                    onClick={changeType}
                  >
                    {type === "password" ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </Button>
                </InputGroup>
              </FormGroup>
              <div className="text-center my-2">
                Don't have an account? <Link to="signup">Sign Up</Link>
              </div>
              <div className="d-flex justify-content-center my-2">
                <Button className="btn-indigo">Log In</Button>
              </div>
              <div className="mt-3 text-center my-2">
                <small className="text-muted">Copyright © EViteU 2021</small>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default LogIn;
