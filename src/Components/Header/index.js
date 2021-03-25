import React from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, Label } from "reactstrap";
import { Wrapper } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import logo from "./../../Assets/Image/Profile/Logo.png";

const Header = (props) => {
  return (
    <Wrapper>
      <Row className="wrapper-dashboard-header">
        <Col xs={6} className="wrapper-header-logo mt-1">
          <img src={logo} alt="Logo EViteU" />
        </Col>
        <Col xs={6} md={4} className="wrapper-header-button">
          <Button
            className="btn-indigo header-button"
            onClick={() => {
              props.setIsOpen(!props.isOpen);
            }}
          >
            <FontAwesomeIcon
              className="fa-lg"
              icon={props.isOpen ? faTimes : faBars}
            />
          </Button>
        </Col>
        <Col md={8} className="wrapper-header-user mt-1">
          <Row>
            <Col xs={5}>
              <Label className="text-muted text-truncate">
                <span className="font-weight-bold">Logged in as:</span>{" "}
                {props.userName}
              </Label>
            </Col>
            <Col className="d-flex justify-content-end">
              <Link
                className="text-muted text-decoration-none mr-2"
                to="/Login"
              >
                <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default Header;
