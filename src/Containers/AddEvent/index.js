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
  FormFeedback,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { LocationSearch } from "../../Components";
import { Wrapper } from "./style";

const AddEvent = (props) => {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [latlng, setLatLng] = useState([]);
  const [highlightImage, setHighlightImage] = useState([]);
  const [primaryColor, setPrimaryColor] = useState("#F2EFE9");
  const [secondaryColor, setSecondaryColor] = useState("#D9C8B4");
  const [accentColor, setAccentColor] = useState("#A6783F");
  const [textColor, setTextColor] = useState("#261711");
  const [max, setMax] = useState("");
  const [preview, setPreview] = useState(null);
  const [modal, setModal] = useState(false);
  const [invalidImage, setInvalidImage] = useState("");
  const [alert] = useState(props.alert);
  const [error] = useState(props.error);
  const [message] = useState(props.message);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("eventTitle", title);
    data.append("eventSubTitle", subtitle);
    data.append("eventDescription", description);
    data.append("eventHighlight", highlightImage);
    data.append("date", date);
    data.append("time", time);
    data.append("location", location);
    data.append("coordinates", latlng.lat + "&" + latlng.lng);
    data.append("primaryColor", primaryColor);
    data.append("secondaryColor", secondaryColor);
    data.append("accentColor", accentColor);
    data.append("textColor", textColor);
    data.append("max", max);
    data.append("idType", type);
    props.addEvent(data);
  };

  const handleType = (event) => {
    setType(event.target.value);
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleSubtitle = (event) => {
    setSubtitle(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleDate = (event) => {
    setDate(event.target.value);
  };

  const handleTime = (event) => {
    setTime(event.target.value);
  };

  const handleHighlightImage = (event) => {
    setInvalidImage("");
    const tmpImage = event.target.files[0];
    if (!tmpImage) {
      setInvalidImage("No image uploaded.");
      setPreview(null);
    } else if (tmpImage.type.match(/\.(jpg|jpeg|png)$/)) {
      setInvalidImage("Invalid image type.");
      setPreview(null);
    } else if (tmpImage.size > 5000000) {
      setInvalidImage("Image size exceeds allowed limit.");
      setPreview(null);
    } else {
      setHighlightImage(tmpImage);
      setPreview(URL.createObjectURL(tmpImage));
    }
  };

  const handlePrimaryColor = (event) => {
    setPrimaryColor(event.target.value);
  };

  const handleSecondaryColor = (event) => {
    setSecondaryColor(event.target.value);
  };

  const handleAccentColor = (event) => {
    setAccentColor(event.target.value);
  };

  const handleTextColor = (event) => {
    setTextColor(event.target.value);
  };

  const handleMax = (event) => {
    setMax(event.target.value);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

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
          <div>
            <Alert isOpen={alert} color={error ? "danger" : "success"}>
              {message}
            </Alert>
          </div>
          <Row className="justify-content-center">
            <Col>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="eventType">Event Type</Label>
                  <Input
                    type="select"
                    name="eventType"
                    defaultValue={type === "" ? "Select event type" : type}
                    onChange={handleType}
                    required
                  >
                    <option defaultChecked disabled>
                      Select event type
                    </option>
                    {props.type.map((type) => (
                      <option key={type.idType} value={type.idType}>
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
                    value={title}
                    onChange={handleTitle}
                    placeholder="Enter event title"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="eventSubTitle">Sub Title</Label>
                  <Input
                    type="text"
                    name="eventSubTitle"
                    value={subtitle}
                    onChange={handleSubtitle}
                    placeholder="Enter event sub title"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="eventDescription">Description</Label>
                  <Input
                    type="textarea"
                    name="eventDescription"
                    value={description}
                    onChange={handleDescription}
                    placeholder="Enter event description"
                    required
                  />
                </FormGroup>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="eventDate">Date</Label>
                      <Input
                        type="date"
                        name="eventDate"
                        value={date}
                        onChange={handleDate}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="eventTime">Time</Label>
                      <Input
                        type="time"
                        name="eventTime"
                        value={time}
                        onChange={handleTime}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="eventLocation">Location</Label>
                  <LocationSearch
                    address={location}
                    setAddress={setLocation}
                    setLatLng={setLatLng}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="eventHighlightImage">Highlight Image</Label>
                  <Input
                    type="file"
                    name="eventHighlightImage"
                    onChange={handleHighlightImage}
                    required
                    invalid={invalidImage !== ""}
                  />
                  <img
                    src={preview}
                    className={`add-event-preview-image mt-3 ${
                      preview === null ? "d-none" : ""
                    }`}
                    alt="preview"
                  />
                  <FormFeedback>{invalidImage}</FormFeedback>
                </FormGroup>
                <Row className="justify-content-between" form>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="eventPrimaryColor">Primary Color</Label>
                      <Input
                        type="color"
                        name="eventPrimaryColor"
                        value={primaryColor}
                        onChange={handlePrimaryColor}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="eventSecondaryColor">Secondary Color</Label>
                      <Input
                        type="color"
                        name="eventSecondaryColor"
                        value={secondaryColor}
                        onChange={handleSecondaryColor}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="eventAccentColor">Accent Color</Label>
                      <Input
                        type="color"
                        name="eventAccentColor"
                        value={accentColor}
                        onChange={handleAccentColor}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="eventTextColor">Text Color</Label>
                      <Input
                        type="color"
                        name="eventTextColor"
                        value={textColor}
                        onChange={handleTextColor}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <div className="d-flex justify-content-center">
                  <Button className="btn-indigo" onClick={toggleModal}>
                    Preview Color Scheme
                  </Button>
                </div>
                <FormGroup>
                  <Label for="eventMaxGuest">
                    Max Number Each Guest can Bring
                  </Label>
                  <Input
                    type="number"
                    name="eventMaxGuest"
                    value={max}
                    onChange={handleMax}
                    min="1"
                    placeholder="Enter max number each geuest can bring"
                    required
                  />
                </FormGroup>
                <div className="d-flex my-3 justify-content-center">
                  <Button className="btn-indigo" disabled={invalidImage !== ""}>
                    Create
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Color Scheme Preview</ModalHeader>
          <ModalBody>
            <div style={{ backgroundColor: `${primaryColor}` }}>
              <p>Primary Color</p>
              <div style={{ backgroundColor: `${secondaryColor}` }}>
                <p>Secondary Color</p>
                <p style={{ color: `${textColor}` }}>Text Color</p>
                <Button
                  style={{
                    color: `${textColor}`,
                    backgroundColor: `${accentColor}`,
                    borderColor: `${accentColor}`,
                  }}
                >
                  Button
                </Button>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button className="btn-indigo" onClick={toggleModal}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </Wrapper>
  );
};

export default AddEvent;
