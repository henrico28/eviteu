import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
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
} from "reactstrap";
import { Wrapper } from "./style";
import useUserData from "../../LocalStorage/useUserData";

const AddEvent = (props) => {
  const history = useHistory();
  const { userData, setUserData, removeUserData } = useUserData();
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [highlightImage, setHighlightImage] = useState([]);
  const [primaryColor, setPrimaryColor] = useState("#000000");
  const [secondaryColor, setSecondaryColor] = useState("#000000");
  const [accentColor, setAccentColor] = useState("#000000");
  const [max, setMax] = useState("");
  const [preview, setPreview] = useState(null);
  const [invalid, setInvalid] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const fetchData = async (data) => {
    setError(false);
    setIsOpen(false);
    setMessage("");
    await axios
      .post("http://localhost:8000/event/create", data, {
        headers: { authorization: `Bearer ${userData.accessToken}` },
      })
      .then((res) => {
        setIsOpen(true);
        setMessage(res.data.message);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        if (
          err.response.data.error &&
          err.response.data.error === "jwt expired"
        ) {
          axios
            .post("http://localhost:8000/token", {
              userEmail: userData.email,
              refreshToken: userData.refreshToken,
            })
            .then((res) => {
              let tmp = userData;
              tmp.accessToken = res.data.accessToken;
              setUserData(tmp);
              fetchData(data);
            })
            .catch((err) => {
              removeUserData();
              props.setLoading(false);
              history.push("../..");
            });
        } else {
          setIsOpen(true);
          setError(true);
          let errorMessage = "Error";
          if (err.response.data.error) {
            errorMessage = err.response.data.error;
          }
          setMessage(errorMessage);
          window.scrollTo(0, 0);
        }
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("eventTitle", title);
    data.append("eventSubTitle", subtitle);
    data.append("eventDescription", description);
    data.append("eventHighlight", highlightImage);
    data.append("date", date);
    data.append("time", time);
    data.append("location", location);
    data.append("eventPrimary", primaryColor);
    data.append("eventSecondary", secondaryColor);
    data.append("eventAccent", accentColor);
    data.append("max", max);
    data.append("idType", type);
    fetchData(data);
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

  const handleLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleHighlightImage = (event) => {
    setInvalid("");
    const tmpImage = event.target.files[0];
    if (!tmpImage) {
      setInvalid("No image uploaded.");
      setPreview(null);
    } else if (tmpImage.type.match(/\.(jpg|jpeg|png)$/)) {
      setInvalid("Invalid image type.");
      setPreview(null);
    } else if (tmpImage.size > 5000000) {
      setInvalid("Image size exceeds allowed limit.");
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

  const handleMax = (event) => {
    setMax(event.target.value);
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
            <Alert
              isOpen={isOpen}
              color={error === false ? "success" : "danger"}
            >
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
                  <Input
                    type="text"
                    name="eventLocation"
                    value={location}
                    onChange={handleLocation}
                    placeholder="Enter event location"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="eventHighlightImage">Highlight Image</Label>
                  <Input
                    type="file"
                    name="eventHighlightImage"
                    onChange={handleHighlightImage}
                    required
                    invalid={invalid !== ""}
                  />
                  <img
                    src={preview}
                    className={`add-event-preview-image mt-3 ${
                      preview === null ? "d-none" : ""
                    }`}
                    alt="preview"
                  />
                  <FormFeedback>{invalid}</FormFeedback>
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
                </Row>
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
                  <Button className="btn-indigo" disabled={invalid !== ""}>
                    Create
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

export default AddEvent;
