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
  FormFeedback,
  InputGroup,
  InputGroupText,
  Button,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Wrapper } from "./style";

const SignUp = (props) => {
  const [type, setType] = useState("password");

  const changeType = () => {
    setType(type === "password" ? "text" : "password");
  };

  return (
    <Wrapper>
      <Container className="wrapper-signup" fluid>
        <Button
          onClick={changeType}
          className="position-absolute bg-transparent border-0 signup-back-button"
          tag={Link}
          to=""
        >
          <FontAwesomeIcon icon={faTimes} className="text-white" size="3x" />
        </Button>
        <Row className="justify-content-center min-vh-100 align-items-center">
          <Col className="shadow-lg p-4 bg-white" md={4}>
            <div className="d-flex justify-content-center my-2">
              <h1 className="px-3 py-2 d-inline-block text-white signup-title">
                Sign Up
              </h1>
            </div>
            <Form>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">E-mail</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <InputGroup>
                  <Input
                    type={type}
                    name="password"
                    placeholder="Enter Password"
                    required
                  />
                  <Button
                    onClick={changeType}
                    className="signup-button button-hide"
                  >
                    {type === "password" ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </Button>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label for="phonenumber">Phone Number</Label>
                <Input
                  type="text"
                  name="phonenumber"
                  placeholder="Enter Phone Number"
                  required
                />
              </FormGroup>
              <div className="d-flex justify-content-center mt-4">
                <Button className="signup-button">Sign Up</Button>
              </div>
              <div className="mt-3 text-center ">
                <small className="text-muted">Copyright © EViteU 2021</small>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default SignUp;
