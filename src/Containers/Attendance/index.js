import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  InputGroup,
  Input,
  Label,
  Table,
  Badge,
  Alert,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "../../Components";

const Attendance = (props) => {
  const [id] = useState(props.id);
  const [originalData] = useState(props.data);
  const [data, setData] = useState(props.data);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(6);
  const [numberOfData, setNumberOfData] = useState(props.data.length);
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
        return data.userName.toLowerCase().includes(query.toLowerCase());
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

  const handleAttend = (guest) => {
    const data = {
      idEvent: id,
      idGuest: guest.idGuest,
      attend: guest.attend ? 0 : 1,
    };
    props.guestAttend(data);
  };

  const renderGuest = () => {
    if (originalData.length === 0) {
      return (
        <tr>
          <td colSpan="4" className="text-center">
            No guest present.
          </td>
        </tr>
      );
    } else if (data.length === 0) {
      return (
        <tr>
          <td colSpan="4" className="text-center">
            No guest with that name.
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
                <td className="align-middle text-center">
                  {guest.attend ? (
                    <Badge color="success">Present</Badge>
                  ) : (
                    <Badge color="danger">Absent</Badge>
                  )}
                </td>
                <td className="align-middle justify-content-center d-flex">
                  {guest.attend ? (
                    <Button
                      color="danger"
                      onClick={() => {
                        handleAttend(guest);
                      }}
                      style={{ width: "80%" }}
                    >
                      Un-Attend
                    </Button>
                  ) : (
                    <Button
                      color="success"
                      onClick={() => {
                        handleAttend(guest);
                      }}
                      style={{ width: "80%" }}
                    >
                      Attend
                    </Button>
                  )}
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
        <Col md={{ size: 6, offset: 6 }} className="d-flex justify-content-end">
          <Label className="mt-1 mr-2 text-muted">Search :</Label>
          <InputGroup style={{ width: "60%" }}>
            <Input
              type="text"
              name="search"
              value={search}
              onChange={handleSearch}
              placeholder="Search event here"
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
              <th className="text-center" width="15%">
                Attendance
              </th>
              <th className="text-center" width="15%">
                Actions
              </th>
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
    </div>
  );
};

export default Attendance;
