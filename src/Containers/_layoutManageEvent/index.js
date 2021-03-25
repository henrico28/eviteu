import React from "react";
import { SideBar, Header } from "../../Components";
import { Container } from "reactstrap";
import { Wrapper } from "./style";

const LayoutManageEvent = (props) => {
  return (
    <Wrapper style={{ overflowX: "hidden", overflowY: "hidden" }}>
      <SideBar isOpen={props.isOpen} page={props.page} />
      <div className={`right ${props.isOpen ? "active" : ""}`}>
        <Container fluid className="min-vh-100 p-0">
          <Header
            isOpen={props.isOpen}
            setIsOpen={props.setIsOpen}
            userName={props.userName}
          />
          <div className="wrapper-title text-muted py-2 px-3 mt-1">
            <h3>{props.title}</h3>
          </div>
          {props.children}
        </Container>
      </div>
    </Wrapper>
  );
};

export default LayoutManageEvent;
