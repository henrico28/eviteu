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
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Wrapper } from "./style";

const SignUp = (props) => {
  const [type, setType] = useState("password");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [modal, setModal] = useState(props.modal);
  const [error] = useState(props.error);
  const [messageTitle] = useState(props.messageTitle);
  const [messageContent] = useState(props.messageContent);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      userName: name,
      userEmail: email,
      userPassword: password,
      phoneNumber: phonenumber,
    };
    props.signUp(data);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handlePhonenumer = (event) => {
    setPhonenumber(event.target.value);
  };

  const changeType = () => {
    setType(type === "password" ? "text" : "password");
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <Wrapper>
      <Container className="wrapper-signup bg-indigo" fluid>
        <Button
          onClick={changeType}
          className="position-absolute bg-transparent border-0 signup-back-button"
          tag={Link}
          to=""
        >
          <FontAwesomeIcon icon={faTimes} className="text-white" size="3x" />
        </Button>
        <Row className="justify-content-center min-vh-100 align-items-center">
          <Col className="shadow-lg p-4 bg-white" md={5} lg={4}>
            <div className="d-flex justify-content-center my-2">
              <h1 className="px-3 py-2 d-inline-block text-white bg-indigo">
                Sign Up
              </h1>
            </div>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleName}
                  placeholder="Enter Your Name"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">E-mail</Label>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmail}
                  placeholder="Enter Email"
                  required
                  invalid={error}
                />
                <FormFeedback>Email has been used.</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <InputGroup>
                  <Input
                    type={type}
                    name="password"
                    value={password}
                    onChange={handlePassword}
                    placeholder="Enter Password"
                    minLength="10"
                    required
                  />
                  <Button
                    onClick={changeType}
                    className="btn-indigo signup-button-hide"
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
                  value={phonenumber}
                  onChange={handlePhonenumer}
                  placeholder="Enter Phone Number"
                  required
                />
              </FormGroup>
              <div className="d-flex justify-content-center mt-4">
                <Button className="btn-indigo">Sign Up</Button>
              </div>
              <div className="mt-3 text-center">
                <small className="text-muted">Copyright © EViteU 2021</small>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modal} toggle={toggleModal} centered={true}>
        <ModalHeader toggle={toggleModal}>{messageTitle}</ModalHeader>
        <ModalBody>{messageContent}</ModalBody>
        <ModalFooter>
          {error ? (
            <Button onClick={toggleModal} className="btn-indigo">
              Close
            </Button>
          ) : (
            <Button tag={Link} className="btn-indigo" to="login">
              Log In
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </Wrapper>
  );
};

export default SignUp;
