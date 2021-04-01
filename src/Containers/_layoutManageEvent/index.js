import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { SideBar, Header, Loading } from "../../Components";
import { Container } from "reactstrap";
import { Wrapper } from "./style";
import useUserData from "../../LocalStorage/useUserData";
import axios from "axios";

const LayoutManageEvent = (props) => {
  const history = useHistory();
  let { userData, removeUserData } = useUserData();
  const [loading, setLoading] = useState(false);

  const logOut = async () => {
    setLoading(true);
    await axios
      .delete("http://localhost:8000/logout", {
        data: {
          userEmail: userData.email,
          refreshToken: userData.refreshToken,
        },
      })
      .then((res) => {
        removeUserData();
        history.push("../..");
      })
      .catch((err) => {
        history.push("../..");
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Wrapper style={{ overflowX: "hidden", overflowY: "hidden" }}>
      <SideBar isOpen={props.isOpen} page={props.page} handleLogOut={logOut} />
      <div className={`right ${props.isOpen ? "active" : ""}`}>
        <Container fluid className="min-vh-100 p-0">
          <Header
            isOpen={props.isOpen}
            setIsOpen={props.setIsOpen}
            userName={userData.name}
            handleLogOut={logOut}
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