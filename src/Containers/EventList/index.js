import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  Input,
  Label,
  Table,
} from "reactstrap";
import { Wrapper } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const EventList = (props) => {
  const renderEvent = () => {
    if (props.data.length === 0) {
      return (
        <tr>
          <td colspan="6" className="text-center">
            No event present.
          </td>
        </tr>
      );
    }
  };

  return (
    <Wrapper>
      <div className="wrapper-event-list">
        <Container fluid>
          <Row>
            <Col>
              <h4 className="text-muted pt-2 font-weight-light event-list-title">
                Event List
              </h4>
              <hr className="mt-0" />
            </Col>
          </Row>
          <Row>
            <Col md={2}>
              <Button className="btn-indigo">Add Event</Button>
            </Col>
            <Col
              md={{ size: 6, offset: 4 }}
              className="wrapper-event-list-search"
            >
              <Label className="mt-1 mr-2 text-muted">Search :</Label>
              <InputGroup className="event-list-search-input">
                <Input type="text" name="search" placeholder="Search here" />
                <Button className="btn-indigo" tag={Link} to="add-event">
                  <FontAwesomeIcon icon={faTimesCircle} />
                </Button>
              </InputGroup>
            </Col>
          </Row>
          <Row className="justify-content-center p-3">
            <Table striped>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Event Title</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{renderEvent()}</tbody>
            </Table>
          </Row>
        </Container>
      </div>
    </Wrapper>
  );
};

export default EventList;
