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

const EditAnnouncement = (props) => {
  const [title, setTitle] = useState(props.data.announcementTitle);
  const [description, setDescription] = useState(
    props.data.announcementDescription
  );
  const [status, setStatus] = useState(props.data.announcementStatus);
  const [alert] = useState(props.alert);
  const [error] = useState(props.error);
  const [message] = useState(props.message);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      idAnnouncement: props.data.idAnnouncement,
      announcementTitle: title,
      announcementDescription: description,
      announcementStatus: status,
    };
    props.updateAnnouncement(data);
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleStatus = (event) => {
    if (event.target.checked) {
      setStatus(event.target.value);
    } else {
      setStatus(0);
    }
  };

  return (
    <Wrapper>
      <div className="wrapper-edit-announcement">
        <Container fluid>
          <Row>
            <Col>
              <h4 className="text-muted pt-2 font-weight-light edit-announcement-title">
                Edit Announcement
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
                  <Label for="announcementTitle">Announcement Title</Label>
                  <Input
                    type="text"
                    name="announcementTitle"
                    value={title}
                    onChange={handleTitle}
                    placeholder="Enter announcement title"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="announcementDescription">
                    Announcement Description
                  </Label>
                  <Input
                    type="textarea"
                    name="announcementDescription"
                    value={description}
                    onChange={handleDescription}
                    placeholder="Enter announcement description"
                    required
                  />
                </FormGroup>
                <Label>Announcement Status</Label>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="announcementStatus"
                      checked={status}
                      onChange={handleStatus}
                      value={1}
                    />{" "}
                    Publish
                  </Label>
                </FormGroup>
                <div className="d-flex my-3 justify-content-center">
                  <Button className="btn-indigo">Update</Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </Wrapper>
  );
};

export default EditAnnouncement;
