import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import { Wrapper } from "./style";

const WarningNoEvent = (props) => {
  return (
    <Wrapper>
      <div className="wrapper-warning-no-event">
        <Container fluid>
          <Row className="justify-content-center ">
            <Col sm={12} className="my-2">
              <h1 className="text-muted text-center">No event present.</h1>
            </Col>
            <Col sm={12} className="d-flex justify-content-center my-2">
              <Button
                className="btn-indigo"
                tag={Link}
                to="/manage-event/add-event"
              >
                Add Event Now
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </Wrapper>
  );
};

export default WarningNoEvent;
