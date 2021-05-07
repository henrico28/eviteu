import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
import QrReader from "react-qr-reader";
import { Wrapper } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const QrScanAttendance = (props) => {
  const [id] = useState(props.id);
  const [result, setResult] = useState("No result");
  const [guest, setGuest] = useState([]);
  const [facingMode, setFacingMode] = useState("environment");
  const [valid, setValid] = useState(false);
  const [alert, setAlert] = useState(props.alert);
  const [error] = useState(props.error);
  const [message] = useState(props.message);

  const handleAttend = () => {
    const data = {
      idEvent: guest[1],
      idGuest: guest[2],
      attend: 1,
    };
    props.guestAttend(data);
  };

  const handleFacingMode = (event) => {
    setFacingMode(event.target.value);
  };

  const handleScan = (data) => {
    if (data) {
      let content = data.split("/");
      if (content.length === 4 && content[0] === "eviteu") {
        if (content[1] !== id) {
          setResult("Wrong event.");
        } else {
          setGuest(content);
          setResult(`Welcome, ${content[3]}.`);
          setValid(true);
        }
      } else {
        setResult("Invalid QR code.");
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <Wrapper>
      <div className="wrapper-qr-scan-attendance">
        <Container fluid>
          <Button
            className="position-absolute qr-scan-attendance-back-button btn-indigo"
            tag={Link}
            to="/manage-event/attendance-list"
          >
            <FontAwesomeIcon icon={faChevronLeft} /> Back
          </Button>
          <Row className="min-vh-100 align-items-center justify-content-center">
            <Col>
              <Row className="justify-content-center my-2">
                <Col>
                  <h1 className="text-center text-indigo qr-scan-attendance-title">
                    Attendance Scanner
                  </h1>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col md={4}>
                  <Alert
                    isOpen={alert}
                    toggle={() => {
                      setAlert(false);
                    }}
                    color={error ? "danger" : "success"}
                  >
                    {message}
                  </Alert>
                </Col>
              </Row>
              <Row className="justify-content-center my-2">
                <Col md={4}>
                  <FormGroup>
                    <Label for="facingMode">Camera Mode</Label>
                    <Input
                      type="select"
                      name="facingMode"
                      defaultValue={facingMode}
                      onChange={handleFacingMode}
                    >
                      <option value="user">user</option>
                      <option value="environment">environment</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="justify-content-center my-2">
                <Col md={4}>
                  <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: "inherit" }}
                    facingMode={facingMode}
                  />
                  <h6 className="text-center my-2">{result}</h6>
                </Col>
              </Row>
              <Row className="justify-content-center my-2">
                <Col className="d-flex justify-content-center">
                  <Button
                    className="btn-indigo"
                    onClick={handleAttend}
                    disabled={!valid}
                  >
                    Attend
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </Wrapper>
  );
};

export default QrScanAttendance;
