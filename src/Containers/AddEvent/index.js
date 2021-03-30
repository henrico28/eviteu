import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Wrapper } from "./style";

const AddEvent = (props) => {
  return (
    <Wrapper>
      <div className="wrapper-add-event">
        <Container fluid>
          <Row>
            <Col>
              <h4 className="text-muted pt-2 font-weight-light add-event-title">
                Add Event
              </h4>
              <hr className="mt-0" />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col>
              <Form>
                <FormGroup>
                  <Label for="eventType">Event Type</Label>
                  <Input type="select" name="eventType" required>
                    <option selected disabled>
                      Select event type
                    </option>
                    {props.type.map((type, idx) => (
                      <option key={idx} value={type.idType}>
                        {type.typeName}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="eventTitle">Title</Label>
                  <Input
                    type="text"
                    name="eventTitle"
                    placeholder="Enter event title"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="eventSubTitle">Sub Title</Label>
                  <Input
                    type="text"
                    name="eventSubTitle"
                    placeholder="Enter event sub title"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="eventDescription">Description</Label>
                  <Input
                    type="textarea"
                    name="eventDescription"
                    placeholder="Enter event description"
                    required
                  />
                </FormGroup>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="eventDate">Date</Label>
                      <Input type="date" name="eventDate" required />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="eventTime">Time</Label>
                      <Input type="time" name="eventTime" required />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="eventLocation">Location</Label>
                  <Input
                    type="text"
                    name="eventLocation"
                    placeholder="Enter event location"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="eventHighlightImage">Highlight Image</Label>
                  <Input type="file" name="eventHighlightImage" required />
                </FormGroup>
                <Row className="justify-content-between" form>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="eventPrimaryColor">Primary Color</Label>
                      <Input type="color" name="eventPrimaryColor" required />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="eventSecondaryColor">Secondary Color</Label>
                      <Input type="color" name="eventSecondaryColor" required />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="eventAccentColor">Accent Color</Label>
                      <Input type="color" name="eventAccentColor" required />
                    </FormGroup>
                  </Col>
                </Row>
                <div className="d-flex justify-content-center">
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

export default AddEvent;
