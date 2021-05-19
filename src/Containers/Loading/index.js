import React from "react";
import { Container, Spinner } from "reactstrap";
import { Wrapper } from "./style";

const Loading = (props) => {
  return (
    <Wrapper>
      <Container
        className="wrapper-loading d-flex flex-row justify-content-center align-items-center min-vh-100"
        fluid
      >
        <Spinner type="grow" className="loading-spinner mx-2" />
        <Spinner type="grow" className="loading-spinner mx-2" />
        <Spinner type="grow" className="loading-spinner mx-2" />
      </Container>
    </Wrapper>
  );
};

export default Loading;
