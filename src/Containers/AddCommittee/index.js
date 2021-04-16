import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
import { Wrapper } from "./style";

const AddCommittee = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [alert] = useState(props.alert);
  const [error] = useState(props.error);
  const [message] = useState(props.message);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      userName: name,
      userEmail: email,
    };
    props.addCommittee(data);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  return (
    <Wrapper>
      <div className="wrapper-add-committee">
        <Container fluid>
          <Row>
            <Col>
              <h4 className="text-muted pt-2 font-weight-light add-committee-title">
                Add Committee
              </h4>
              <hr className="mt-0" />
            </Col>
          </Row>
          <div>
            <Alert isOpen={alert} color={error ? "danger" : "success"}>
              {message}
            </Alert>
          </div>
          <Row className="justify-content-center">
            <Col>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="committeeName">Committee Name</Label>
                  <Input
                    type="text"
                    name="committeeName"
                    value={name}
                    onChange={handleName}
                    placeholder="Enter committee name"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="committeeEmail">Committee E-mail</Label>
                  <Input
                    type="email"
                    name="committeeEmail"
                    value={email}
                    onChange={handleEmail}
                    placeholder="Enter committee e-mail"
                    required
                  />
                </FormGroup>
                <div className="d-flex my-3 justify-content-center">
                  <Button className="btn-indigo">Create</Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </Wrapper>
  );
};

export default AddCommittee;
