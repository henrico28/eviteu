import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, InputGroup, Input, Label, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "../../Components";

const DoorPrizeList = (props) => {
  const [originalData] = useState(props.data);
  const [data, setData] = useState(props.data);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(6);
  const [numberOfData, setNumberOfData] = useState(props.data.length);

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
          data.eventTitle.toLowerCase().includes(query.toLowerCase()) ||
          data.eventSubTitle.toLowerCase().includes(query.toLowerCase())
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

  const renderEvent = () => {
    if (originalData.length === 0) {
      return (
        <tr>
          <td colSpan="3" className="text-center">
            No event present.
          </td>
        </tr>
      );
    } else if (data.length === 0) {
      return (
        <tr>
          <td colSpan="3" className="text-center">
            No event with that name.
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
                <td className="align-middle">
                  {event.eventTitle + " - " + event.eventSubTitle}
                </td>
                <td className="align-middle">
                  <Button
                    className="btn-indigo"
                    tag={Link}
                    to={`/manage-event/doorprize/${event.idEvent}`}
                  >
                    Door Prize
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
    <div>
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
              <th>Event</th>
              <th width="15%">Actions</th>
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
    </div>
  );
};

export default DoorPrizeList;
