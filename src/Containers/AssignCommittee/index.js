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

const AssignCommittee = (props) => {
  const history = useHistory();
  const [id] = useState(props.id);
  const [data, setData] = useState(props.data);
  const [alert] = useState(props.alert);
  const [error] = useState(props.error);
  const [message] = useState(props.message);

  const handleSubmit = (event) => {
    event.preventDefault();
    let listOfCommittee = [];
    data.forEach((committee) => {
      if (committee.status) {
        listOfCommittee.push(committee.idCommittee);
      }
    });
    const payload = {
      idEvent: id,
      listOfCommittee: listOfCommittee,
    };
    props.assignCommittee(payload);
  };

  const handleSelect = (event) => {
    history.push(event.target.value);
  };

  const handleCheck = (index) => {
    const newData = [...data];
    newData[index].status = newData[index].status === 1 ? 0 : 1;
    setData(newData);
  };

  const renderCommittee = () => {
    return (
      <>
        {data.map((committee, idx) => {
          return (
            <FormGroup key={committee.idCommittee} check>
              <Label check>
                <Input
                  type="checkbox"
                  value={committee.idCommittee}
                  defaultChecked={committee.status}
                  onChange={() => {
                    handleCheck(idx);
                  }}
                />{" "}
                {committee.userName}
              </Label>
            </FormGroup>
          );
        })}
      </>
    );
  };

  return (
    <Wrapper>
      <div className="wrapper-assign-committee">
        <Container fluid>
          <Row>
            <Col>
              <h4 className="text-muted pt-2 font-weight-light assign-committee-title">
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
                  <Label for="event" sm={1}>
                    Event
                  </Label>
                  <Col sm={7}>
                    <Input
                      type="select"
                      name="event"
                      defaultValue={id}
                      onChange={handleSelect}
                    >
                      {props.event &&
                        props.event.map((event) => (
                          <option
                            key={event.idEvent}
                            value={event.idEvent}
                            checked={event.idEvent === id}
                          >
                            {event.eventTitle}
                          </option>
                        ))}
                    </Input>
                  </Col>
                </FormGroup>
                <Label>Committee List:</Label>
                {renderCommittee()}
                <div className="d-flex my-3 justify-content-center">
                  <Button className="btn-indigo">Assign</Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </Wrapper>
  );
};

export default AssignCommittee;
