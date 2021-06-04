import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Alert,
} from "reactstrap";

const EditGuest = (props) => {
  const [name, setName] = useState(props.data.userName);
  const [email, setEmail] = useState(props.data.userEmail);
  const [qty, setQty] = useState(props.data.qty);
  const [status, setStatus] = useState(props.data.status);
  const [attend, setAttend] = useState(props.data.attend);
  const [invalid, setInvalid] = useState("");
  const [alert] = useState(props.alert);
  const [error] = useState(props.error);
  const [message] = useState(props.message);

  const handleSubmit = (event) => {
    event.preventDefault();
    if ((status && qty === 0) || (!status && qty !== 0)) {
      if (status) {
        setInvalid("qty");
      } else {
        setInvalid("status");
      }
    } else {
      const data = {
        idUser: props.data.idUser,
        idGuest: props.data.idGuest,
        idEvent: props.data.idEvent,
        userName: name,
        userEmail: email,
        qty: qty,
        status: status,
        attend: attend,
      };
      props.updateGuest(data);
    }
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleQty = (event) => {
    setQty(Number(event.target.value));
    setInvalid("");
  };

  const handleStatus = (event) => {
    if (event.target.checked) {
      setStatus(event.target.value);
    } else {
      setStatus(0);
    }
    setInvalid("");
  };

  const handleAttend = (event) => {
    if (event.target.checked) {
      setAttend(event.target.value);
    } else {
      setAttend(0);
    }
  };

  return (
    <div>
      <div>
        <Alert isOpen={alert} color={error ? "danger" : "success"}>
          {message}
        </Alert>
      </div>
      <Row className="justify-content-center">
        <Col>
          <Form onSubmit={handleSubmit}>
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
            <FormGroup>
              <Label for="guestQty">Number of People Attending</Label>
              <Input
                type="number"
                name="guestQty"
                value={qty}
                onChange={handleQty}
                placeholder="Enter number of people attending"
                min="0"
                max={props.data.max}
                required
                invalid={invalid === "qty"}
              />
              <FormFeedback>
                If guest is attending, number of people attending must not be 0.
              </FormFeedback>
            </FormGroup>
            <Label>Guest RSVP</Label>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="guestStatus"
                  checked={status}
                  onChange={handleStatus}
                  value={1}
                  invalid={invalid === "status"}
                />{" "}
                Attending
                <FormFeedback>
                  If number of people attending is not 0, guest RSVP must be
                  attending.
                </FormFeedback>
              </Label>
            </FormGroup>
            <Label>Guest Attendance</Label>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="guestAttendance"
                  checked={attend}
                  onChange={handleAttend}
                  value={1}
                />{" "}
                Present
              </Label>
            </FormGroup>
            <div className="d-flex my-3 justify-content-center">
              <Button className="btn-indigo" disabled={invalid !== ""}>
                Update
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default EditGuest;
