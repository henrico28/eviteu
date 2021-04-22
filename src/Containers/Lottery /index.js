import React, { useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Wrapper } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Lottery = (props) => {
  const [data] = useState(props.data);
  const [winner, setWinner] = useState(
    props.data.length === 0 ? "No guest attended yet" : ""
  );

  const handleDraw = () => {
    let idx = Math.floor(Math.random() * data.length);
    setWinner(data[idx].userName);
  };

  return (
    <Wrapper>
      <Container className="wrapper-lottery" fluid>
        <Button className="position-absolute lottery-back-button btn-indigo">
          <FontAwesomeIcon icon={faChevronLeft} /> Back
        </Button>
        <Row className="min-vh-100 align-items-center justify-content-center">
          <Col>
            <Row
              className={`justify-content-center my-2 ${
                props.data.length === 0 ? "d-none" : ""
              }`}
            >
              <h4 className="lottery-congratulations-text">Congratulations!</h4>
            </Row>
            <Row className="justify-content-center">
              <Col
                md={6}
                className="border rounded shadow wrapper-lottery-winner d-flex align-items-center justify-content-center"
              >
                <h1 className="text-center">{winner}</h1>
              </Col>
            </Row>
            <Row className="justify-content-center my-4">
              <Button
                onClick={() => {
                  handleDraw();
                }}
                size="lg"
                className="btn-indigo"
                disabled={props.data.length === 0}
              >
                Draw
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Lottery;
