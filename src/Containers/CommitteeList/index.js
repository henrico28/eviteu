import React, { useState } from "react";
import { Link } from "react-router-dom";
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

const CommitteeList = (props) => {
  const [originalData] = useState(props.data);
  const [data, setData] = useState(props.data);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(6);
  const [numberOfData, setNumberOfData] = useState(props.data.length);
  const [activateConfirmationModal, setActivateConfirmationModal] =
    useState(false);
  const [deactivateConfirmationModal, setDeactivateConfirmationModal] =
    useState(false);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [committee, setCommittee] = useState("");
  const [alert, setAlert] = useState(props.alert);
  const [error] = useState(props.error);
  const [message] = useState(props.message);

  // Get Current Data
  const indexOfLastPage = currentPage * dataPerPage;
  const indexOfFirstPage = indexOfLastPage - dataPerPage;

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

  const toggleActivateConfirmationModal = () => {
    setActivateConfirmationModal(!activateConfirmationModal);
  };

  const toggleDeactivateConfirmationModal = () => {
    setDeactivateConfirmationModal(!deactivateConfirmationModal);
  };

  const toggleDeleteConfirmationModal = () => {
    setDeleteConfirmationModal(!deleteConfirmationModal);
  };

  const handleConfirmation = (committee, confirmation) => {
    switch (confirmation) {
      case "activate":
        toggleActivateConfirmationModal();
        break;
      case "deactivate":
        toggleDeactivateConfirmationModal();
        break;
      case "delete":
        toggleDeleteConfirmationModal();
        break;
      default:
        console.log("Error");
        break;
    }
    setCommittee(committee);
  };

  const handleActivateAll = () => {
    props.activateAllCommittee();
  };

  const handleActivate = () => {
    const data = {
      idUser: committee.idUser,
      idCommittee: committee.idCommittee,
    };
    props.activateCommittee(data);
  };

  const handleDeactivate = () => {
    const data = {
      idUser: committee.idUser,
      idCommittee: committee.idCommittee,
    };
    props.deactivateCommittee(data);
  };

  const handleDelete = () => {
    const data = {
      idUser: committee.idUser,
      idCommittee: committee.idCommittee,
    };
    props.deleteCommittee(data);
  };

  const renderCommittee = () => {
    if (originalData.length === 0) {
      return (
        <tr>
          <td colSpan="5" className="text-center">
            No committee present.
          </td>
        </tr>
      );
    } else if (data.length === 0) {
      return (
        <tr>
          <td colSpan="5" className="text-center">
            No committee with that name or email.
          </td>
        </tr>
      );
    } else {
      return (
        <>
          {data
            .slice(indexOfFirstPage, indexOfLastPage)
            .map((committee, idx) => {
              return (
                <tr key={committee.idCommittee}>
                  <td className="align-middle">{idx + 1}</td>
                  <td className="align-middle">{committee.userName}</td>
                  <td className="align-middle">{committee.userEmail}</td>
                  <td className="align-middle">
                    {committee.active ? (
                      <Badge color="success">Active</Badge>
                    ) : (
                      <Badge color="danger">Not active</Badge>
                    )}
                  </td>
                  <td className="align-middle">
                    <UncontrolledButtonDropdown>
                      <DropdownToggle className="btn-indigo" caret>
                        <FontAwesomeIcon icon={faCog} /> Actions
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          tag={Link}
                          to={`assign-event/${committee.idCommittee}`}
                        >
                          Assign
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => {
                            handleConfirmation(committee, "activate");
                          }}
                        >
                          {committee.active ? "Re-Activate" : "Activate"}
                        </DropdownItem>
                        <DropdownItem
                          className={`${committee.active ? "" : "d-none"}`}
                          onClick={() => {
                            handleConfirmation(committee, "deactivate");
                          }}
                        >
                          Deactivate
                        </DropdownItem>
                        <DropdownItem
                          tag={Link}
                          to={`edit-committee/${committee.idCommittee}`}
                        >
                          Edit
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => {
                            handleConfirmation(committee, "delete");
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
        <Col md={4}>
          <Button className="btn-indigo" tag={Link} to="add-committee">
            Add Committee
          </Button>
          <Button
            className="btn-indigo mx-2"
            onClick={() => {
              handleActivateAll();
            }}
          >
            Activate All
          </Button>
        </Col>
        <Col md={{ size: 6, offset: 2 }} className="d-flex justify-content-end">
          <Label className="mt-1 mr-2 text-muted">Search :</Label>
          <InputGroup style={{ width: "60%" }}>
            <Input
              type="text"
              name="search"
              value={search}
              onChange={handleSearch}
              placeholder="Search committee name & email here"
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
              <th>Name</th>
              <th>E-mail</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderCommittee()}</tbody>
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
        isOpen={activateConfirmationModal}
        toggle={toggleActivateConfirmationModal}
        centered={true}
      >
        <ModalHeader toggle={toggleActivateConfirmationModal}>
          Confirmation
        </ModalHeader>
        <ModalBody>
          Are you sure you want to{" "}
          {committee.active ? "re-activate" : "activate"} Committee{" "}
          {committee.userName}?
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-indigo"
            onClick={() => {
              handleActivate();
            }}
          >
            Yes
          </Button>
          <Button onClick={toggleActivateConfirmationModal} color="danger">
            No
          </Button>
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={deactivateConfirmationModal}
        toggle={toggleDeactivateConfirmationModal}
        centered={true}
      >
        <ModalHeader toggle={toggleDeactivateConfirmationModal}>
          Confirmation
        </ModalHeader>
        <ModalBody>
          Are you sure you want to deactivate Committee {committee.userName}?
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-indigo"
            onClick={() => {
              handleDeactivate();
            }}
          >
            Yes
          </Button>
          <Button onClick={toggleDeactivateConfirmationModal} color="danger">
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
          Are you sure you want to delete Committee {committee.userName}?
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

export default CommitteeList;
