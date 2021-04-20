import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
  Badge,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { Wrapper } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faCog } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "../../Components";

const AnnouncementList = (props) => {
  const history = useHistory();
  const [id] = useState(props.id);
  const [originalData] = useState(props.data);
  const [data, setData] = useState(props.data);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(6);
  const [numberOfData, setNumberOfData] = useState(props.data.length);
  const [publishConfirmationModal, setPublishConfirmationModal] = useState(
    false
  );
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [alert, setAlert] = useState(props.alert);
  const [error] = useState(props.error);
  const [message] = useState(props.message);

  // Get Current Data
  const indexOfLastPage = currentPage * dataPerPage;
  const indexOfFirstPage = indexOfLastPage - dataPerPage;

  const handleSelect = (event) => {
    history.push(event.target.value);
  };

  const handleSearch = (event) => {
    let query = event.target.value;
    setSearch(query);
    let tmpData = originalData;
    if (query !== "") {
      tmpData = tmpData.filter((data) => {
        return data.announcementTitle
          .toLowerCase()
          .includes(query.toLowerCase());
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

  const togglePublishConfirmationModal = () => {
    setPublishConfirmationModal(!publishConfirmationModal);
  };

  const toggleDeleteConfirmationModal = () => {
    setDeleteConfirmationModal(!deleteConfirmationModal);
  };

  const handleConfirmation = (announcement, confirmation) => {
    switch (confirmation) {
      case "publish":
        togglePublishConfirmationModal();
        break;
      case "delete":
        toggleDeleteConfirmationModal();
        break;
      default:
        console.log("Error");
        break;
    }
    setAnnouncement(announcement);
  };

  const handlePublish = () => {
    const data = {
      idEvent: id,
      idAnnouncement: announcement.idAnnouncement,
      announcementStatus: announcement.announcementStatus ? 0 : 1,
    };
    props.publishAnnouncement(data);
  };

  const handleDelete = () => {
    const data = {
      idEvent: id,
      idAnnouncement: announcement.idAnnouncement,
    };
    props.deleteAnnouncement(data);
  };

  const renderAnnouncement = () => {
    if (originalData.length === 0) {
      return (
        <tr>
          <td colSpan="5" className="text-center">
            No announcement present.
          </td>
        </tr>
      );
    } else if (data.length === 0) {
      return (
        <tr>
          <td colSpan="5" className="text-center">
            No announcement with that title.
          </td>
        </tr>
      );
    } else {
      return (
        <>
          {data
            .slice(indexOfFirstPage, indexOfLastPage)
            .map((announcement, idx) => {
              return (
                <tr key={announcement.idAnnouncement}>
                  <td className="align-middle">{idx + 1}</td>
                  <td className="align-middle">
                    {announcement.announcementTitle}
                  </td>
                  <td className="align-middle text-wrap">
                    {announcement.announcementDescription}
                  </td>
                  <td className="align-middle">
                    {announcement.announcementStatus ? (
                      <Badge color="success">Published</Badge>
                    ) : (
                      <Badge color="danger">Not published</Badge>
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
                            handleConfirmation(announcement, "publish");
                          }}
                        >
                          {announcement.announcementStatus
                            ? "Unpublish"
                            : "Publish"}
                        </DropdownItem>
                        <DropdownItem
                          tag={Link}
                          to={`/manage-event/edit-announcement/${announcement.idAnnouncement}`}
                        >
                          Edit
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => {
                            handleConfirmation(announcement, "delete");
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
    <Wrapper>
      <div className="wrapper-announcement-list">
        <Container fluid>
          <Row>
            <Col>
              <h4 className="text-muted pt-2 font-weight-light announcement-list-title">
                Announcement List
              </h4>
              <hr className="mt-0" />
            </Col>
          </Row>
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
              <InputGroup className="announcement-list-event-select">
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
                className="btn-indigo mx-2"
                tag={Link}
                to={`/manage-event/add-announcement/${id}`}
              >
                Add Announcement
              </Button>
            </Col>
            <Col md={6} className="wrapper-announcement-list-search">
              <Label className="mt-1 mr-2 text-muted">Search :</Label>
              <InputGroup className="announcement-list-search-input">
                <Input
                  type="text"
                  name="search"
                  value={search}
                  onChange={handleSearch}
                  placeholder="Search announcement title here"
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
                  <th width="20%">Title</th>
                  <th width="30%">Description</th>
                  <th width="10%">Status</th>
                  <th width="10%">Actions</th>
                </tr>
              </thead>
              <tbody>{renderAnnouncement()}</tbody>
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
        <Modal
          isOpen={publishConfirmationModal}
          toggle={togglePublishConfirmationModal}
          centered={true}
        >
          <ModalHeader toggle={togglePublishConfirmationModal}>
            Confirmation
          </ModalHeader>
          <ModalBody>
            Are you sure you want to publish Announcement{" "}
            {announcement.announcementTitle}?
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn-indigo"
              onClick={() => {
                handlePublish();
              }}
            >
              Yes
            </Button>
            <Button onClick={togglePublishConfirmationModal} color="danger">
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
            Are you sure you want to delete Announcement{" "}
            {announcement.announcementTitle}?
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
    </Wrapper>
  );
};

export default AnnouncementList;
