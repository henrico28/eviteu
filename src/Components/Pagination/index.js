import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Wrapper } from "./style";

const PaginationComponent = (props) => {
  const numOfPages = Math.ceil(props.totalData / props.dataPerPage);
  const pageNumbers = [];

  if (props.currentPage - 1 > 0) {
    pageNumbers.push(props.currentPage - 1);
  }
  pageNumbers.push(props.currentPage);
  if (props.currentPage + 1 <= numOfPages) {
    pageNumbers.push(props.currentPage + 1);
  }

  const renderPageNumbers = pageNumbers.map((pageNumber) => {
    return (
      <PaginationItem
        key={pageNumber}
        className={`${pageNumber === props.currentPage ? "active" : ""}`}
      >
        <PaginationLink
          className={`pagination-button ${
            pageNumber === props.currentPage ? "active" : ""
          }`}
          onClick={() => {
            props.setPage(pageNumber);
          }}
        >
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    );
  });

  if (props.totalData === 0) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <Wrapper>
      <div className={`${props.backgroundColor ? "" : "wrapper-pagination"}`}>
        <Pagination size="md">
          {/* PREVIOUS BUTTON */}
          <PaginationItem
            className={`${props.currentPage === 1 ? "disabled" : ""}`}
          >
            <PaginationLink
              className={`${
                props.currentPage === 1 ? "" : "pagination-button"
              }`}
              onClick={() => {
                props.setPage(props.currentPage - 1);
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </PaginationLink>
          </PaginationItem>
          {/* FIRST BUTTON */}
          <PaginationItem
            className={`${
              props.currentPage <= 2 || numOfPages <= 2 ? "d-none" : ""
            }`}
          >
            <PaginationLink
              className="pagination-button"
              onClick={() => {
                props.setPage(1);
              }}
            >
              1
            </PaginationLink>
          </PaginationItem>
          {/* MORE PREVIOUS MARKER */}
          <PaginationItem
            className={`${
              props.currentPage <= 2 || numOfPages <= 2 ? "d-none" : ""
            }`}
            disabled
          >
            <PaginationLink>...</PaginationLink>
          </PaginationItem>

          {renderPageNumbers}

          {/* MORE NEXT MARKER */}
          <PaginationItem
            className={`${
              props.currentPage >= numOfPages - 1 || numOfPages <= 2
                ? "d-none"
                : ""
            }`}
            disabled
          >
            <PaginationLink>...</PaginationLink>
          </PaginationItem>

          {/* LAST BUTTON */}
          <PaginationItem
            className={`${
              props.currentPage >= numOfPages - 1 || numOfPages <= 2
                ? "d-none"
                : ""
            }`}
          >
            <PaginationLink
              className="pagination-button"
              onClick={() => {
                props.setPage(numOfPages);
              }}
            >
              {numOfPages}
            </PaginationLink>
          </PaginationItem>

          {/* NEXT BUTTON */}
          <PaginationItem
            className={`${props.currentPage === numOfPages ? "disabled" : ""}`}
          >
            <PaginationLink
              className={`${
                props.currentPage === numOfPages ? "" : "pagination-button"
              }`}
              onClick={() => {
                props.setPage(props.currentPage + 1);
              }}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </div>
    </Wrapper>
  );
};

export default PaginationComponent;
