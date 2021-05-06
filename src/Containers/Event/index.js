import React, { useState } from "react";
import { Container, Row, Col, Button, Label } from "reactstrap";
import { DisplayLocation } from "../../Components";
import { Wrapper } from "./style";

const Event = (props) => {
  const [event] = useState(props.data);
  const [announcements] = useState(props.announcement);
  const [count] = useState(window.outerWidth <= 600 ? 1 : 3);
  const [latLng] = useState(
    event.coordinates ? event.coordinates.split("&") : []
  );

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
                  className="mx-4 event-text"
                  key={announcement.idAnnouncement}
                  md={3}
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

  return (
    <Wrapper>
      <div className="wrapper-event">
        <Container
          className="min-vh-100"
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
          >
            Log Out
          </Button>
          <Row
            className="wrapper-event-highlight align-items-center justify-content-center"
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
                >
                  RSVP
                </Button>
              </div>
            </Col>
          </Row>
          <Row className="wrapper-event-content align-items-center justify-content-center">
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
            className="wrapper-event-content align-items-center justify-content-center"
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
          <Container className="py-5" fluid>
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
                announcements.length === 0 ? "" : "wrapper-event-conten"
              }t align-items-center justify-content-center my-md-4`}
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
                >
                  Show More
                </Button>
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    </Wrapper>
  );
};

export default Event;
