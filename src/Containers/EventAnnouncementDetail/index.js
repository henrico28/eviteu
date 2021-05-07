import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Label } from "reactstrap";
import { Wrapper } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const EventAnnouncementDetail = (props) => {
  const [data] = useState(props.data);
  console.log(data);

  return (
    <Wrapper>
      <div className="wrapper-event-announcement-detail">
        <Container
          className="min-vh-100"
          style={{
            color: `${data.textColor}`,
            backgroundColor: `${data.primaryColor}`,
          }}
          fluid
        >
          <Button
            className="position-absolute event-announcement-detail-back-button"
            style={{
              color: `${data.textColor}`,
              backgroundColor: `${data.accentColor}`,
              borderColor: `${data.accentColor}`,
            }}
            tag={Link}
            to="/event/announcement-list"
          >
            Back
          </Button>
          <Row
            className="align-items-center justify-content-center wrapper-event-announcement-detail-highlight"
            style={{ backgroundColor: `${data.secondaryColor}` }}
          >
            <Col>
              <h1 className="text-center event-announcement-detail-title">
                {data.announcementTitle}
              </h1>
            </Col>
          </Row>
          <Row className="align-items-center justify-content-center p-4 wrapper-event-announcement-detail-announcement">
            <Col>{data.announcementDescription}</Col>
          </Row>
          <Row
            className="align-items-center justify-content-center p-3"
            style={{ backgroundColor: `${data.accentColor}` }}
          >
            <Col>
              <Row className="justify-content-center p-2">
                <Col className="d-flex justify-content-center" md={5}>
                  <div
                    className="d-inline-block py-1 px-2"
                    style={{ backgroundColor: `${data.secondaryColor}` }}
                  >
                    <h3 className="text-center event-announcement-detail-description-title m-0">
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
                    <FontAwesomeIcon icon={faEnvelope} /> {data.userEmail}
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
                    <FontAwesomeIcon icon={faPhone} /> {data.phoneNumber}
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

export default EventAnnouncementDetail;
