import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
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
  Badge,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faCog } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "../../Components";

const GuestList = (props) => {
  const history = useHistory();
  const [id] = useState(props.id);
  const [originalData] = useState(props.data);
  const [data, setData] = useState(props.data);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(6);
  const [numberOfData, setNumberOfData] = useState(props.data.length);
  const [inviteConfirmationModal, setInviteConfirmationModal] = useState(false);
  const [uninviteConfirmationModal, setUninviteConfirmationModal] =
    useState(false);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [guest, setGuest] = useState("");
  const [alert, setAlert] = useState(props.alert);
  const [error] = useState(props.error);
  const [message] = useState(props.message);

  // Get Current Data
  const indexOfLastPage = currentPage * dataPerPage;
  const indexOfFirstPage = indexOfLastPage - dataPerPage;

  const handleSelect = (event) => {
    props.setAlert(false);
    history.push(event.target.value);
  };

  const handleSearch = (event) => {
    let query = event.target.value;
    setSearch(query);
    let tmpData = originalData;
    if (query !== "") {
      tmpData = tmpData.filter((data) => {
        return (
          data.userName.toLowerCase().includes(query.toLowerCase()) ||
          data.userEmail.toLowerCase().includes(query.toLowerCase())
        );
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

  const toggleInviteConfirmationModal = () => {
    setInviteConfirmationModal(!inviteConfirmationModal);
  };

  const toggleUninviteConfirmationModal = () => {
    setUninviteConfirmationModal(!uninviteConfirmationModal);
  };

  const toggleDeleteConfirmationModal = () => {
    setDeleteConfirmationModal(!deleteConfirmationModal);
  };

  const handleConfirmation = (guest, confirmation) => {
    switch (confirmation) {
      case "invite":
        toggleInviteConfirmationModal();
        break;
      case "uninvite":
        toggleUninviteConfirmationModal();
        break;
      case "delete":
        toggleDeleteConfirmationModal();
        break;
      default:
        console.log("Error");
        break;
    }
    setGuest(guest);
  };

  const handleInviteAll = () => {
    const data = {
      idEvent: id,
    };
    props.inviteAllGuest(data);
  };

  const handleInvite = () => {
    const data = {
      idUser: guest.idUser,
      idGuest: guest.idGuest,
      idEvent: guest.idEvent,
    };
    props.inviteGuest(data);
  };

  const handleUninvite = () => {
    const data = {
      idUser: guest.idUser,
      idGuest: guest.idGuest,
      idEvent: guest.idEvent,
    };
    props.uninviteGuest(data);
  };

  const handleDelete = () => {
    const data = {
      idUser: guest.idUser,
      idGuest: guest.idGuest,
      idEvent: id,
    };
    props.deleteGuest(data);
  };

  const renderGuest = () => {
    if (originalData.length === 0) {
      return (
        <tr>
          <td colSpan="8" className="text-center">
            No guest present.
          </td>
        </tr>
      );
    } else if (data.length === 0) {
      return (
        <tr>
          <td colSpan="8" className="text-center">
            No guest with that name or email.
          </td>
        </tr>
      );
    } else {
      return (
        <>
          {data.slice(indexOfFirstPage, indexOfLastPage).map((guest, idx) => {
            return (
              <tr key={guest.idGuest}>
                <td className="align-middle">{idx + 1}</td>
                <td className="align-middle">{guest.userName}</td>
                <td className="align-middle">{guest.userEmail}</td>
                <td className="align-middle">{guest.qty}</td>
                <td className="align-middle">
                  {guest.status ? (
                    <Badge color="success">Attending</Badge>
                  ) : (
                    <Badge color="danger">Not attending</Badge>
                  )}
                </td>
                <td className="align-middle">
                  {guest.invited ? (
                    <Badge color="success">Invited</Badge>
                  ) : (
                    <Badge color="danger">Not invited</Badge>
                  )}
                </td>
                <td className="align-middle">
                  {guest.attend ? (
                    <Badge color="success">Present</Badge>
                  ) : (
                    <Badge color="danger">Absent</Badge>
                  )}
                </td>
                <td className="align-middle">
                  <UncontrolledButtonDropdown>
                    <DropdownToggle className="btn-indigo" caret>
                      <FontAwesomeIcon icon={faCog} /> Actions
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        onClick={() => {
                          handleConfirmation(guest, "invite");
                        }}
                      >
                        {guest.invited ? "Re-Invite" : "Invite"}
                      </DropdownItem>
                      <DropdownItem
                        className={`${guest.invited ? "" : "d-none"}`}
                        onClick={() => {
                          handleConfirmation(guest, "uninvite");
                        }}
                      >
                        Uninvite
                      </DropdownItem>
                      <DropdownItem
                        tag={Link}
                        to={`/manage-event/edit-guest/${guest.idGuest}`}
                      >
                        Edit
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          handleConfirmation(guest, "delete");
                        }}
                      >
                        Delete
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
        <Col md={6} className="d-flex">
          <InputGroup style={{ width: "50%" }}>
            <Input
              type="select"
              name="event"
              defaultValue={id}
              onChange={handleSelect}
            >
              {props.event &&
                props.event.map((event) => (
                  <option
                    key={event.idEvent}
                    value={event.idEvent}
                    checked={event.idEvent === id}
                  >
                    {event.eventTitle}
                  </option>
                ))}
            </Input>
          </InputGroup>
          <Button
            className="btn-indigo ml-2"
            tag={Link}
            to={`/manage-event/add-guest/${id}`}
          >
            Add Guest
          </Button>
          <Button
            className="btn-indigo ml-2"
            onClick={() => {
              handleInviteAll();
            }}
          >
            Invite All
          </Button>
        </Col>
        <Col md={6} className="d-flex justify-content-end">
          <Label className="mt-1 mr-2 text-muted">Search :</Label>
          <InputGroup style={{ width: "70%" }}>
            <Input
              type="text"
              name="search"
              value={search}
              onChange={handleSearch}
              placeholder="Search guest name or email here"
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
              <th width="20%">Name</th>
              <th width="20%">E-mail</th>
              <th width="10%">Num of People</th>
              <th width="10%">RSVP</th>
              <th width="10%">Invited</th>
              <th width="10%">Attendance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderGuest()}</tbody>
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
      <Modal
        isOpen={inviteConfirmationModal}
        toggle={toggleInviteConfirmationModal}
        centered={true}
      >
        <ModalHeader toggle={toggleInviteConfirmationModal}>
          Confirmation
        </ModalHeader>
        <ModalBody>
          Are you sure you want to {guest.invited ? "re-invite" : "invite"}{" "}
          Guest {guest.userName}?
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-indigo"
            onClick={() => {
              handleInvite();
            }}
          >
            Yes
          </Button>
          <Button onClick={toggleInviteConfirmationModal} color="danger">
            No
          </Button>
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={uninviteConfirmationModal}
        toggle={toggleUninviteConfirmationModal}
        centered={true}
      >
        <ModalHeader toggle={toggleUninviteConfirmationModal}>
          Confirmation
        </ModalHeader>
        <ModalBody>
          Are you sure you want to uninvite Guest {guest.userName}?
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-indigo"
            onClick={() => {
              handleUninvite();
            }}
          >
            Yes
          </Button>
          <Button onClick={toggleUninviteConfirmationModal} color="danger">
            No
          </Button>
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={deleteConfirmationModal}
        toggle={toggleDeleteConfirmationModal}
        centered={true}
      >
        <ModalHeader toggle={toggleDeleteConfirmationModal}>
          Confirmation
        </ModalHeader>
        <ModalBody>
          Are you sure you want to delete Guest {guest.userName}?
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-indigo"
            onClick={() => {
              handleDelete();
            }}
          >
            Yes
          </Button>
          <Button onClick={toggleDeleteConfirmationModal} color="danger">
            No
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default GuestList;
