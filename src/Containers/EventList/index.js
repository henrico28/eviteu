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
  Alert,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Spinner,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faSquare,
  faCog,
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
  const [detailModal, setDetailModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [committeeModal, setCommitteeModal] = useState(false);
  const [event, setEvent] = useState("");
  const [alert, setAlert] = useState(props.alert);
  const [error] = useState(props.error);
  const [message] = useState(props.message);
  const [loading, setLoading] = useState(false);

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

  const toggleDetailModal = () => {
    setDetailModal(!detailModal);
  };

  const toggleConfirmationModal = () => {
    setConfirmationModal(!confirmationModal);
  };

  const toggleCommitteeModal = () => {
    setCommitteeModal(!committeeModal);
  };

  const handleCommittee = (event) => {
    setLoading(true);
    props.committeeEvent(event.idEvent);
    setEvent(event);
    setCommitteeModal(true);
    setLoading(false);
  };

  const handleDetail = (event) => {
    toggleDetailModal();
    setDetail(event);
  };

  const handleConfirmation = (event) => {
    toggleConfirmationModal();
    setEvent(event);
  };

  const renderEvent = () => {
    if (originalData.length === 0) {
      return (
        <tr>
          <td colSpan="7" className="text-center">
            No event present.
          </td>
        </tr>
      );
    } else if (data.length === 0) {
      return (
        <tr>
          <td colSpan="7" className="text-center">
            No event with that title.
          </td>
        </tr>
      );
    } else {
      return (
        <>
          {data.slice(indexOfFirstPage, indexOfLastPage).map((event, idx) => {
            return (
              <tr key={event.idEvent}>
                <td className="align-middle">{idx + 1}</td>
                <td className="align-middle">{event.eventTitle}</td>
                <td className="align-middle">
                  {event.date.substring(0, 10) + " " + event.time}
                </td>
                <td className="align-middle">
                  {(event.totalGuestRsvp === null
                    ? "0"
                    : event.totalGuestRsvp) +
                    "/" +
                    (event.totalGuestInvited === null
                      ? "0"
                      : event.totalGuestInvited)}
                </td>
                <td className="align-middle">
                  {event.totalGuestBrought === null
                    ? "0"
                    : event.totalGuestBrought}
                </td>
                <td className="align-middle">
                  {(event.totalGuestAttended === null
                    ? "0"
                    : event.totalGuestAttended) +
                    "/" +
                    (event.totalGuestRsvp === null
                      ? "0"
                      : event.totalGuestRsvp)}
                </td>
                <td className="align-middle">
                  <UncontrolledButtonDropdown>
                    <DropdownToggle className="btn-indigo" caret>
                      <FontAwesomeIcon icon={faCog} /> Actions
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        tag={Link}
                        to={`guest-list/${event.idEvent}`}
                      >
                        Guest
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          handleCommittee(event);
                        }}
                      >
                        Committee
                      </DropdownItem>
                      <DropdownItem
                        tag={Link}
                        to={`announcement-list/${event.idEvent}`}
                      >
                        Announcement
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          handleDetail(event);
                        }}
                      >
                        Detail
                      </DropdownItem>
                      <DropdownItem
                        tag={Link}
                        to={`edit-event/${event.idEvent}`}
                      >
                        Edit
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          handleConfirmation(event);
                        }}
                      >
                        Delete
                      </DropdownItem>
                      <DropdownItem
                        tag={Link}
                        to={`/manage-event/preview-event/${event.idEvent}`}
                      >
                        Preview
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                </td>
              </tr>
            );
          })}
        </>
      );
    }
  };

  const renderCommittee = () => {
    if (loading) {
      return (
        <div className="d-flex justify-content-center">
          <Spinner />
        </div>
      );
    } else {
      if (props.committee.length === 0) {
        return <div>No committee assigned.</div>;
      } else {
        return (
          <ul>
            {props.committee &&
              props.committee.map((committee) => (
                <li key={committee.idCommittee}>{committee.userName}</li>
              ))}
          </ul>
        );
      }
    }
  };

  return (
    <div>
      <div>
        <Alert
          isOpen={alert}
          toggle={() => {
            setAlert(false);
          }}
          color={error ? "danger" : "success"}
        >
          {message}
        </Alert>
      </div>
      <Row>
        <Col md={2}>
          <Button className="btn-indigo" tag={Link} to="add-event">
            Add Event
          </Button>
        </Col>
        <Col md={{ size: 6, offset: 4 }} className="d-flex justify-content-end">
          <Label className="mt-1 mr-2 text-muted">Search :</Label>
          <InputGroup style={{ width: "60%" }}>
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
        <Table className="border table-responsive-sm" striped>
          <thead>
            <tr>
              <th width="3%">No.</th>
              <th>Event Title</th>
              <th>Date & Time</th>
              <th>RSVP</th>
              <th>Participant</th>
              <th>Attended</th>
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
      <Modal isOpen={detailModal} toggle={toggleDetailModal} centered={true}>
        <ModalHeader toggle={toggleDetailModal}>
          <span className="font-weight-bold">Event Detail:</span>{" "}
          {detail.eventTitle}
        </ModalHeader>
        <ModalBody>
          <div>
            <span className="font-weight-bold">Type:</span> {detail.typeName}
          </div>
          <div>
            <span className="font-weight-bold">Title:</span> {detail.eventTitle}
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
              {detail.primaryColor}
              <FontAwesomeIcon
                icon={faSquare}
                style={{ color: `${detail.primaryColor}` }}
                className="mx-1"
              />
            </div>
          </div>
          <div>
            <div>
              <span className="font-weight-bold">Secondary Color:</span>{" "}
              {detail.secondaryColor}
              <FontAwesomeIcon
                icon={faSquare}
                style={{ color: `${detail.secondaryColor}` }}
                className="mx-1"
              />
            </div>
          </div>
          <div>
            <div>
              <span className="font-weight-bold">Accent Color:</span>{" "}
              {detail.accentColor}
              <FontAwesomeIcon
                icon={faSquare}
                style={{ color: `${detail.accentColor}` }}
                className="mx-1"
              />
            </div>
          </div>
          <div>
            <div>
              <span className="font-weight-bold">Text Color:</span>{" "}
              {detail.textColor}
              <FontAwesomeIcon
                icon={faSquare}
                style={{ color: `${detail.textColor}` }}
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
          <Button className="btn-indigo" onClick={toggleDetailModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={confirmationModal}
        toggle={toggleConfirmationModal}
        centered={true}
      >
        <ModalHeader toggle={toggleConfirmationModal}>Confirmation</ModalHeader>
        <ModalBody>
          Are you sure you want to delete Event {event.eventTitle}?
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-indigo"
            onClick={() => {
              props.deleteEvent(event.idEvent);
            }}
          >
            Yes
          </Button>
          <Button onClick={toggleConfirmationModal} color="danger">
            No
          </Button>
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={committeeModal}
        toggle={toggleCommitteeModal}
        centered={true}
      >
        <ModalHeader toggle={toggleCommitteeModal}>
          Committee: {event.eventTitle}
        </ModalHeader>
        <ModalBody>{renderCommittee()}</ModalBody>
        <ModalFooter>
          <Button
            className="btn-indigo"
            tag={Link}
            to={`assign-committee/${event.idEvent}`}
          >
            Assign Committee
          </Button>
          <Button onClick={toggleCommitteeModal} color="danger">
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EventList;
