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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Wrapper } from "./style";

const LogIn = (props) => {
  const [type, setType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(props.modal);
  const [message] = useState(props.message);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      userEmail: email,
      userPassword: password,
    };
    props.logIn(data);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const changeType = () => {
    setType(type === "password" ? "text" : "password");
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <Wrapper>
      <Container className="wrapper-login" fluid>
        <Button
          onClick={changeType}
          className="position-absolute bg-transparent border-0 text-indigo login-back-button"
          tag={Link}
          to=""
        >
          <FontAwesomeIcon icon={faTimes} size="3x" />
        </Button>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col
            className="bg-indigo wrapper-login-title d-flex justify-content-center align-items-center shadow-lg"
            md={5}
          >
            <h1 className="text-white text-center font-weight-bold login-title">
              EViteU
            </h1>
          </Col>
          <Col md={{ size: 5, offset: 1 }}>
            <Form onSubmit={handleSubmit}>
              <div>
                <h1 className="text-center text-indigo">Log In</h1>
              </div>
              <FormGroup>
                <Label for="email">E-mail</Label>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmail}
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
                    value={password}
                    onChange={handlePassword}
                    placeholder="Enter Password"
                    required
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
      <Modal isOpen={modal} toggle={toggleModal} centered={true}>
        <ModalHeader toggle={toggleModal}>Error</ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          <Button className="btn-indigo" onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Wrapper>
  );
};

export default LogIn;
