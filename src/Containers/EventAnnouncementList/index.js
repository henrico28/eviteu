import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Col, Button, Label } from "reactstrap";
import { Pagination } from "../../Components";
import { Wrapper } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const EventAnnouncementList = (props) => {
  const history = useHistory();
  const [event] = useState(props.data);
  const [announcements] = useState(props.announcement);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(6);
  const [numberOfData] = useState(props.announcement.length);

  // Get Current Data
  const indexOfLastPage = currentPage * dataPerPage;
  const indexOfFirstPage = indexOfLastPage - dataPerPage;

  const renderAnnouncement = () => {
    if (announcements.length === 0) {
      return (
        <Col>
          <h1 className="text-center event-announcement-list-description-title">
            No announcement.
          </h1>
        </Col>
      );
    } else {
      return (
        <>
          {announcements
            .slice(indexOfFirstPage, indexOfLastPage)
            .map((announcement) => {
              return (
                <Col
                  key={announcement.idAnnouncement}
                  className="event-announcement-list-announcement event-announcement-list-text my-3"
                  md={4}
                  onClick={() => {
                    history.push(
                      `/event/announcement-detail/${announcement.idAnnouncement}`
                    );
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
            })}
        </>
      );
    }
  };

  return (
    <Wrapper>
      <div className="wrapper-event-announcement-list">
        <Container
          className="min-vh-100"
          style={{
            color: `${event.textColor}`,
            backgroundColor: `${event.primaryColor}`,
          }}
          fluid
        >
          <Button
            className="position-absolute event-announcement-list-back-button"
            style={{
              color: `${event.textColor}`,
              backgroundColor: `${event.accentColor}`,
              borderColor: `${event.accentColor}`,
            }}
            tag={Link}
            to="/event"
          >
            Back
          </Button>
          <Row
            className="align-items-center justify-content-center wrapper-event-annoucement-list-highlight"
            style={{ backgroundColor: `${event.secondaryColor}` }}
          >
            <Col>
              <h1 className="text-center event-announcement-list-title">
                Announcement
              </h1>
            </Col>
          </Row>
          <Row className="align-items-center justify-content-center p-4 wrapper-event-announcement-list-announcement">
            {renderAnnouncement()}
          </Row>
          <div className="d-flex justify-content-center mt-2 mb-4">
            <Pagination
              currentPage={currentPage}
              totalData={numberOfData}
              dataPerPage={dataPerPage}
              setPage={setCurrentPage}
              backgroundColor={event.accentColor}
              textColor={event.textColor}
            />
          </div>
          <Row
            className="align-items-center justify-content-center p-3"
            style={{ backgroundColor: `${event.accentColor}` }}
          >
            <Col>
              <Row className="justify-content-center p-2">
                <Col className="d-flex justify-content-center" md={5}>
                  <div
                    className="d-inline-block py-1 px-2"
                    style={{ backgroundColor: `${event.secondaryColor}` }}
                  >
                    <h3 className="text-center event-announcement-list-description-title m-0">
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
      </div>
    </Wrapper>
  );
};

export default EventAnnouncementList;
