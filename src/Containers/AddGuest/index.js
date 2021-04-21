import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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

const AddGuest = (props) => {
  const history = useHistory();
  const [id] = useState(props.id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(props.alert);
  const [error] = useState(props.error);
  const [message] = useState(props.message);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      userName: name,
      userEmail: email,
      idEvent: id,
    };
    props.addGuest(data);
  };

  const handleSelect = (event) => {
    props.setAlert(false);
    setAlert(false);
    history.push(event.target.value);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  return (
    <Wrapper>
      <div className="wrapper-add-guest">
        <Container fluid>
          <Row>
            <Col>
              <h4 className="text-muted pt-2 font-weight-light add-guest-title">
                Add Guest
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
                  <Input
                    type="select"
                    name="event"
                    defaultValue={id}
                    onChange={handleSelect}
                  >
                    {props.event.map((event) => (
                      <option
                        key={event.idEvent}
                        value={event.idEvent}
                        checked={event.idEvent === id}
                      >
                        {event.eventTitle}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="guestName">Guest Name</Label>
                  <Input
                    type="text"
                    name="guestName"
                    value={name}
                    onChange={handleName}
                    placeholder="Enter guest name"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="guestEmail">Guest Email</Label>
                  <Input
                    type="email"
                    name="guestEmail"
                    value={email}
                    onChange={handleEmail}
                    placeholder="Enter guest email"
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

export default AddGuest;
