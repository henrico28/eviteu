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

const AssignEvent = (props) => {
  const history = useHistory();
  const [id] = useState(props.id);
  const [data, setData] = useState(props.data);
  const [alert] = useState(props.alert);
  const [error] = useState(props.error);
  const [message] = useState(props.message);

  const handleSubmit = (event) => {
    event.preventDefault();
    let listOfEvent = [];
    data.forEach((event) => {
      if (event.status) {
        listOfEvent.push(event.idEvent);
      }
    });
    const payload = {
      idCommittee: id,
      listOfEvent: listOfEvent,
    };
    props.assignEvent(payload);
  };

  const handleSelect = (event) => {
    history.push(event.target.value);
  };

  const handleCheck = (index) => {
    const newData = [...data];
    newData[index].status = newData[index].status === 1 ? 0 : 1;
    setData(newData);
  };

  const renderEvent = () => {
    return (
      <>
        {data.map((event, idx) => {
          return (
            <FormGroup key={event.idEvent} check>
              <Label check>
                <Input
                  type="checkbox"
                  value={event.idEvent}
                  defaultChecked={event.status}
                  onChange={() => {
                    handleCheck(idx);
                  }}
                />{" "}
                {event.eventTitle}
              </Label>
            </FormGroup>
          );
        })}
        {data.length === 0 ? <Label>No event present</Label> : <></>}
      </>
    );
  };

  return (
    <Wrapper>
      <div className="wrapper-assign-event">
        <Container fluid>
          <Row>
            <Col>
              <h4 className="text-muted pt-2 font-weight-light assign-event-title">
                Assign Committee
              </h4>
              <hr className="mt-0" />
            </Col>
          </Row>
          <div>
            <Alert isOpen={alert} color={error ? "danger" : "success"}>
              {message}
            </Alert>
          </div>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
                <FormGroup row>
                  <Label for="committee" sm={1}>
                    Committee
                  </Label>
                  <Col sm={7}>
                    <Input
                      type="select"
                      name="committee"
                      defaultValue={id}
                      onChange={handleSelect}
                    >
                      {props.committee &&
                        props.committee.map((committee) => (
                          <option
                            key={committee.idCommittee}
                            value={committee.idCommittee}
                            checked={committee.idCommittee === id}
                          >
                            {committee.userName}
                          </option>
                        ))}
                    </Input>
                  </Col>
                </FormGroup>
                <Label>Event List:</Label> {renderEvent()}
                <div className="d-flex my-3 justify-content-center">
                  <Button className="btn-indigo" disabled={data.length === 0}>
                    Assign
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </Wrapper>
  );
};

export default AssignEvent;
