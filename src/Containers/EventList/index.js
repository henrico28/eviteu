import React from "react";
import { Container } from "reactstrap";
import { Wrapper } from "./style";
import useUserData from "../../LocalStorage/useUserData";

const EventList = (props) => {
  const { userData, setUserData } = useUserData();

  return (
    <Wrapper>
      <Container className="wrapper-event-list" fluid>
        {userData.email}
      </Container>
    </Wrapper>
  );
};

export default EventList;
