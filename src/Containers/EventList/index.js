import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  Input,
  Label,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Wrapper } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faInfoCircle,
  faEdit,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "../../Components";

const EventList = (props) => {
  const [originalData] = useState(props.data);
  const [data, setData] = useState(props.data);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(6);
  const [numberOfData, setNumberOfData] = useState(props.data.length);
  const [detail, setDetail] = useState([]);
  const [modal, setModal] = useState(false);

  // Get Current Data
  const indexOfLastPage = currentPage * dataPerPage;
  const indexOfFirstPage = indexOfLastPage - dataPerPage;

  const handleSearch = (event) => {
    let query = event.target.value;
    setSearch(query);
    let tmpData = originalData;
    if (query !== "") {
      tmpData = tmpData.filter((data) => {
        return data.eventTitle.toLowerCase().includes(query.toLowerCase());
      });
    }
    setCurrentPage(1);
    setData(tmpData);
    setNumberOfData(tmpData.length);
  };

  const handleClear = () => {
    setSearch("");
    setCurrentPage(1);
    setData(originalData);
    setNumberOfData(originalData.length);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleDetail = (eventDetail) => {
    toggleModal();
    setDetail(eventDetail);
  };

  const renderEvent = () => {
    if (data.length === 0) {
      return (
        <tr>
          <td colSpan="7" className="text-center">
            No event present.
          </td>
        </tr>
      );
    } else {
      return (
        <>
          {data.slice(indexOfFirstPage, indexOfLastPage).map((event, idx) => {
            return (
              <tr key={idx}>
                <td width="3%" className="align-middle">
                  {idx + 1}
                </td>
                <td className="align-middle">{event.eventTitle}</td>
                <td width="15%" className="align-middle">
                  {event.date.substring(0, 10) + " " + event.time}
                </td>
                <td width="10%" className="align-middle">
                  {(event.totalGuestRsvp === null
                    ? "0"
                    : event.totalGuestRsvp) +
                    "/" +
                    (event.totalGuestInvited === null
                      ? "0"
                      : event.totalGuestInvited)}
                </td>
                <td width="10%" className="align-middle">
                  {event.totalGuestBrought === null
                    ? "0"
                    : event.totalGuestBrought}
                </td>
                <td width="15%" className="align-middle">
                  {(event.totalGuestAttended === null
                    ? "0"
                    : event.totalGuestAttended) +
                    "/" +
                    (event.totalGuestRsvp === null
                      ? "0"
                      : event.totalGuestRsvp)}
                </td>
                <td className="align-middle">
                  <Button
                    color="primary"
                    className="mx-1"
                    onClick={() => {
                      handleDetail(event);
                    }}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} /> Detail
                  </Button>
                  <Button color="warning" className="mx-1">
                    <FontAwesomeIcon icon={faEdit} />
                    Edit
                  </Button>
                </td>
              </tr>
            );
          })}
        </>
      );
    }
  };

  return (
    <Wrapper>
      <div className="wrapper-event-list">
        <Container fluid>
          <Row>
            <Col>
              <h4 className="text-muted pt-2 font-weight-light event-list-title">
                Event List
              </h4>
              <hr className="mt-0" />
            </Col>
          </Row>
          <Row>
            <Col md={2}>
              <Button className="btn-indigo" tag={Link} to="add-event">
                Add Event
              </Button>
            </Col>
            <Col
              md={{ size: 6, offset: 4 }}
              className="wrapper-event-list-search"
            >
              <Label className="mt-1 mr-2 text-muted">Search :</Label>
              <InputGroup className="event-list-search-input">
                <Input
                  type="text"
                  name="search"
                  value={search}
                  onChange={handleSearch}
                  placeholder="Search event title here"
                />
                <Button
                  className="btn-indigo"
                  onClick={handleClear}
                  disabled={search === ""}
                >
                  <FontAwesomeIcon icon={faTimesCircle} />
                </Button>
              </InputGroup>
            </Col>
          </Row>
          <Row className="justify-content-center px-3 pt-3 pb-1">
            <Table className="border" striped>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Event Title</th>
                  <th>Date & Time</th>
                  <th>Guest RSVP</th>
                  <th>Total Guest</th>
                  <th>Guest Attended</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{renderEvent()}</tbody>
            </Table>
          </Row>
          <div className="d-flex justify-content-center">
            <Pagination
              currentPage={currentPage}
              totalData={numberOfData}
              dataPerPage={dataPerPage}
              setPage={setCurrentPage}
            />
          </div>
        </Container>
        <Modal isOpen={modal} toggle={toggleModal} centered={true}>
          <ModalHeader toggle={toggleModal}>
            <span className="font-weight-bold">Event Detail:</span>{" "}
            {detail.eventTitle}
          </ModalHeader>
          <ModalBody>
            <div>
              <span className="font-weight-bold">Title:</span>{" "}
              {detail.eventTitle}
            </div>
            <div>
              <span className="font-weight-bold">Subtitle:</span>{" "}
              {detail.eventSubTitle}
            </div>
            <div>
              <span className="font-weight-bold">Description:</span>{" "}
              {detail.eventDescription}
            </div>
            <div>
              <Container fluid>
                <Row>
                  <span className="font-weight-bold">Highlight Image:</span>
                </Row>
                <Row>
                  <img
                    src={`http://localhost:8000/images/${detail.eventHighlight}`}
                    alt="Event highlight"
                    className="border"
                    width="auto"
                    height="150px"
                  />
                </Row>
              </Container>
            </div>
            <div>
              <span className="font-weight-bold">Date:</span>{" "}
              {detail.date && detail.date.substring(0, 10)}
            </div>
            <div>
              <span className="font-weight-bold">Time:</span> {detail.time}
            </div>
            <div>
              <span className="font-weight-bold">Location:</span>{" "}
              {detail.location}
            </div>
            <div>
              <div>
                <span className="font-weight-bold">Primary Color:</span>{" "}
                {detail.eventPrimary}
                <FontAwesomeIcon
                  icon={faSquare}
                  style={{ color: `${detail.eventPrimary}` }}
                  className="mx-1"
                />
              </div>
            </div>
            <div>
              <div>
                <span className="font-weight-bold">Secondary Color:</span>{" "}
                {detail.eventSecondary}
                <FontAwesomeIcon
                  icon={faSquare}
                  style={{ color: `${detail.eventSecondary}` }}
                  className="mx-1"
                />
              </div>
            </div>
            <div>
              <div>
                <span className="font-weight-bold">Accent Color:</span>{" "}
                {detail.eventAccent}
                <FontAwesomeIcon
                  icon={faSquare}
                  style={{ color: `${detail.eventAccent}` }}
                  className="mx-1"
                />
              </div>
            </div>
            <div>
              <span className="font-weight-bold">Max People per Guest:</span>{" "}
              {detail.max}
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

export default EventList;
