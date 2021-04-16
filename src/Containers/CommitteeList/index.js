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

const CommitteeList = (props) => {
  const history = useHistory();
  const [originalData] = useState(props.data);
  const [data, setData] = useState(props.data);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(6);
  const [numberOfData, setNumberOfData] = useState(props.data.length);
  console.log(data);

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

  const renderCommittee = () => {
    if (data.length === 0) {
      return (
        <tr>
          <td colSpan="5" className="text-center">
            No committee present.
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
                    {committee.active === 0 ? (
                      <Badge color="danger">Not active</Badge>
                    ) : (
                      <Badge color="success">Active</Badge>
                    )}
                  </td>
                  <td className="align-middle">
                    <UncontrolledButtonDropdown>
                      <DropdownToggle className="btn-indigo" caret>
                        <FontAwesomeIcon icon={faCog} /> Actions
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>Assign</DropdownItem>
                        <DropdownItem>
                          {committee.active === 0 ? "Activate" : "Re-Activate"}
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
      <div className="wrapper-committee-list">
        <Container fluid>
          <Row>
            <Col>
              <h4 className="text-muted pt-2 font-weight-light committee-list-title">
                Committee List
              </h4>
              <hr className="mt-0" />
            </Col>
          </Row>
          <div className="d-none">
            <Alert></Alert>
          </div>
          <Row>
            <Col md={4}>
              <Button className="btn-indigo" tag={Link} to="add-committee">
                Add Committee
              </Button>
              <Button className="btn-indigo mx-2">Activate All</Button>
            </Col>
            <Col
              md={{ size: 6, offset: 2 }}
              className="wrapper-committee-list-search"
            >
              <Label className="mt-1 mr-2 text-muted">Search :</Label>
              <InputGroup className="committee-list-search-input">
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
        </Container>
      </div>
    </Wrapper>
  );
};

export default CommitteeList;
