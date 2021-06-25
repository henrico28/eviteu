import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { DisplayLocation } from "../../Components";
import QRCode from "react-qr-code";
import { Wrapper } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const Event = (props) => {
  const [event] = useState(props.data);
  const [announcements] = useState(
    props.announcement ? props.announcement : []
  );
  const [count] = useState(window.outerWidth <= 600 ? 1 : 3);
  const [latLng] = useState(
    event.coordinates ? event.coordinates.split("&") : []
  );
  const [detail, setDetail] = useState({});
  const [modal, setModal] = useState(false);
  const [step, setStep] = useState(props.step ? props.step : 0);
  const [qty, setQty] = useState(event.qty ? event.qty : 0);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleNotAttend = () => {
    const data = {
      qty: 0,
      status: 0,
    };
    setStep(0);
    props.rsvpGuest(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      qty: qty,
      status: 1,
    };
    setStep(2);
    props.rsvpGuest(data);
  };

  const handleDetailAnnouncement = (announcement) => {
    setDetail(announcement);
    toggleModal();
  };

  const handleQty = (event) => {
    setQty(event.target.value);
  };

  const renderAnnouncement = () => {
    if (announcements.length === 0) {
      return (
        <Col className="event-no-content d-flex justify-content-center align-items-center">
          <h1 className="text-center event-description-title">
            No announcement.
          </h1>
        </Col>
      );
    } else {
      let i = 0;
      return (
        <>
          {announcements.map((announcement) => {
            if (i < count) {
              i++;
              return (
                <Col
                  className="mx-4 wrapper-event-announcement"
                  key={announcement.idAnnouncement}
                  md={3}
                  onClick={() => {
                    handleDetailAnnouncement(announcement);
                  }}
                >
                  <h4 className="text-center font-weight-bold">
                    {announcement.announcementTitle}
                  </h4>
                  <p className="text-justify">
                    {announcement.announcementDescription}
                  </p>
                </Col>
              );
            } else {
              return (
                <React.Fragment
                  key={announcement.idAnnouncement}
                ></React.Fragment>
              );
            }
          })}
        </>
      );
    }
  };

  const renderRSVP = () => {
    switch (step) {
      case 0:
        return (
          <Col xs={{ order: 1, size: 8 }} md={5}>
            <div
              className="py-2"
              style={{ backgroundColor: `${event.primaryColor}` }}
            >
              <div className="my-3">
                <h3 className="text-center event-description-title">RSVP</h3>
              </div>
              <div className="d-flex justify-content-center flex-column">
                <Label className="text-center event-text ">
                  Are you attending?
                </Label>
                <div className="d-flex justify-content-center my-2">
                  <Button
                    style={{
                      color: `${event.textColor}`,
                      backgroundColor: `${event.accentColor}`,
                      borderColor: `${event.accentColor}`,
                    }}
                    onClick={() => {
                      setStep(1);
                    }}
                    disabled={props.preview}
                  >
                    Yes
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        );
      case 1:
        return (
          <Col xs={{ order: 1, size: 8 }} md={5}>
            <div
              className="p-3"
              style={{ backgroundColor: `${event.primaryColor}` }}
            >
              <div className="my-3">
                <h3 className="text-center event-description-title">RSVP</h3>
              </div>
              <div className="d-flex justify-content-center flex-column">
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label className="text-center event-text ">
                      How many people are comming?
                    </Label>
                    <Input
                      type="number"
                      onChange={handleQty}
                      value={qty}
                      min="1"
                      max={event.max}
                      placeholder="Enter number of guest"
                      required
                    />
                  </FormGroup>
                  <div className="d-flex justify-content-around my-2">
                    <Button
                      style={{
                        color: `${event.textColor}`,
                        backgroundColor: `${event.accentColor}`,
                        borderColor: `${event.accentColor}`,
                      }}
                      onClick={() => {
                        setQty(0);
                        setStep(0);
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      style={{
                        color: `${event.textColor}`,
                        backgroundColor: `${event.accentColor}`,
                        borderColor: `${event.accentColor}`,
                      }}
                    >
                      Confirm
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        );
      case 2:
        return (
          <Col xs={{ order: 1, size: 8 }} md={5}>
            <div
              className="py-2"
              style={{ backgroundColor: `${event.primaryColor}` }}
            >
              <div className="my-3">
                <h3 className="text-center event-description-title">QR Code</h3>
              </div>
              <div className="d-flex justify-content-center flex-column">
                <div className="d-flex justify-content-center event-qrcode">
                  <QRCode
                    value={`eviteu/${event && event.idEvent}/${
                      event && event.idGuest
                    }/${props.guest && props.guest}`}
                    size={120}
                  />
                </div>
                <div className="d-flex justify-content-around my-3">
                  <Button
                    className="mx-1"
                    style={{
                      color: `${event.textColor}`,
                      backgroundColor: `${event.accentColor}`,
                      borderColor: `${event.accentColor}`,
                    }}
                    onClick={() => {
                      handleNotAttend();
                    }}
                  >
                    Not Attending
                  </Button>
                  <Button
                    className="mx-1"
                    style={{
                      color: `${event.textColor}`,
                      backgroundColor: `${event.accentColor}`,
                      borderColor: `${event.accentColor}`,
                    }}
                    onClick={() => {
                      setStep(1);
                    }}
                  >
                    Change Qty
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        );
      default:
        console.log("Error");
        break;
    }
  };

  return (
    <Wrapper>
      <div className="wrapper-event">
        <Container
          className="min-vh-100 d-flex flex-column"
          style={{
            color: `${event.textColor}`,
            backgroundColor: `${event.primaryColor}`,
          }}
          fluid
        >
          <Button
            className="position-absolute event-logout-button"
            style={{
              color: `${event.textColor}`,
              backgroundColor: `${event.accentColor}`,
              borderColor: `${event.accentColor}`,
            }}
            onClick={() => {
              props.logOut();
            }}
            disabled={props.preview}
          >
            Log Out
          </Button>
          <Row
            className="wrapper-event-highlight event-highlight align-items-center justify-content-center"
            style={{
              backgroundImage: `url(http://localhost:8000/images/${event.eventHighlight})`,
              textAlign: "center",
            }}
          >
            <Col md={{ order: 1 }}>
              <h1 className="my-3 event-title">{event.eventTitle}</h1>
              <h3 className="my-3 event-subtitle">{event.eventSubTitle}</h3>
              <div className="d-flex justify-content-center my-4">
                <Button
                  style={{
                    color: `${event.textColor}`,
                    backgroundColor: `${event.accentColor}`,
                    borderColor: `${event.accentColor}`,
                  }}
                  href="#rsvp"
                >
                  RSVP
                </Button>
              </div>
            </Col>
          </Row>
          <Row className="wrapper-event-content event-description align-items-center justify-content-center">
            <Col className="d-flex justify-content-center" md={5}>
              <div
                className="d-inline-block py-1 px-2"
                style={{ backgroundColor: `${event.secondaryColor}` }}
              >
                <h3 className="text-center event-description-title m-0">
                  Description
                </h3>
              </div>
            </Col>
            <Col md={{ offset: 1, size: 5 }}>
              <div>
                <p className="text-justify event-text">
                  {event.eventDescription}
                </p>
              </div>
            </Col>
          </Row>
          <Row
            className="wrapper-event-content event-datetime-location align-items-center justify-content-center"
            style={{ backgroundColor: `${event.secondaryColor}` }}
          >
            <Col md={{ size: 5 }}>
              <div className="d-flex flex-column event-text">
                <Label className="font-weight-bold">Date & Time</Label>
                <p>
                  {event.date && event.date.substring(0, 10)}
                  <br />
                  {event.time}
                </p>
              </div>
              <div className="d-flex flex-column event-text">
                <Label className="font-weight-bold">Location</Label>
                <p>{event.location}</p>
              </div>
              <div className="d-flex justify-content-center">
                <Button
                  style={{
                    color: `${event.textColor}`,
                    backgroundColor: `${event.accentColor}`,
                    borderColor: `${event.accentColor}`,
                  }}
                  href={`https://www.google.com/maps/search/?api=1&query=${latLng[0]},${latLng[1]}`}
                  target="_blank"
                >
                  View On Map
                </Button>
              </div>
            </Col>
            <Col
              md={{ offset: 1, size: 5 }}
              className="wrapper-location-display"
            >
              <DisplayLocation
                location={event.location}
                lat={latLng && latLng[0]}
                lng={latLng && latLng[1]}
              />
            </Col>
          </Row>
          <Container className="py-5 event-announcement" fluid>
            <Row className="justify-content-center">
              <Col className="d-flex justify-content-center" md={12}>
                <div
                  className="d-inline-block py-1 px-2"
                  style={{ backgroundColor: `${event.secondaryColor}` }}
                >
                  <h3 className="text-center event-description-title m-0">
                    Announcement
                  </h3>
                </div>
              </Col>
            </Row>
            <Row
              className={`${
                announcements.length === 0 ? "" : "wrapper-event-content"
              } align-items-center justify-content-center my-md-3`}
            >
              {renderAnnouncement()}
            </Row>
            <Row className="justify-content-center">
              <Col className="d-flex justify-content-center" md={12}>
                <Button
                  style={{
                    color: `${event.textColor}`,
                    backgroundColor: `${event.accentColor}`,
                    borderColor: `${event.accentColor}`,
                  }}
                  disabled={announcements.length === 0}
                  tag={Link}
                  to="/event/announcement-list"
                >
                  Show More
                </Button>
              </Col>
            </Row>
          </Container>
          <Row
            id="rsvp"
            className="wrapper-event-content event-rsvp align-items-center justify-content-center"
            style={{ backgroundColor: `${event.secondaryColor}` }}
          >
            {renderRSVP()}
          </Row>
          <Row
            className="align-items-center event-contacts justify-content-center p-3"
            style={{ backgroundColor: `${event.accentColor}` }}
          >
            <Col>
              <Row className="justify-content-center p-2">
                <Col className="d-flex justify-content-center" md={5}>
                  <div
                    className="d-inline-block py-1 px-2"
                    style={{ backgroundColor: `${event.secondaryColor}` }}
                  >
                    <h3 className="text-center event-description-title m-0">
                      Contacts
                    </h3>
                  </div>
                </Col>
              </Row>
              <Row className="justify-content-center p-2">
                <Col
                  className="d-flex justify-content-center"
                  md={{ order: 1, size: 3 }}
                  xs={{ order: 1 }}
                >
                  <Label className="text-center">
                    <FontAwesomeIcon icon={faEnvelope} /> {event.userEmail}
                  </Label>
                </Col>
                <Col
                  className="d-flex justify-content-center"
                  md={{ order: 2, size: 4 }}
                  xs={{ order: 3 }}
                >
                  <Label className="text-center font-weight-bold">
                    Powered By EViteU
                  </Label>
                </Col>
                <Col
                  className="d-flex justify-content-center"
                  md={{ order: 3, size: 3 }}
                  xs={{ order: 2 }}
                >
                  <Label className="text-center">
                    <FontAwesomeIcon icon={faPhone} /> {event.phoneNumber}
                  </Label>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Modal isOpen={modal} toggle={toggleModal} centered={true}>
          <ModalHeader toggle={toggleModal}>
            {detail.announcementTitle}
          </ModalHeader>
          <ModalBody>{detail.announcementDescription}</ModalBody>
          <ModalFooter>
            <Button
              style={{
                color: `${event.textColor}`,
                backgroundColor: `${event.accentColor}`,
                borderColor: `${event.accentColor}`,
              }}
              onClick={toggleModal}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </Wrapper>
  );
};

export default Event;
