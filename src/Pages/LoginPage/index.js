import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Loading } from "../../Components";
import { LogIn } from "../../Containers";
import axios from "axios";
import useUserData from "../../Hooks/useUserData";

const LogInPage = (props) => {
  const { REACT_APP_REQUEST_URL } = process.env;
  const history = useHistory();
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  const { userData, setUserData } = useUserData();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios
        .post(`${REACT_APP_REQUEST_URL}/verify`, {
          verificationToken: token,
        })
        .then((res) => {
          const data = {
            email: res.data.email,
            name: res.data.name,
            role: res.data.role,
            idRole: res.data.idRole,
            idEvent: res.data.idEvent,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          };
          setUserData(data);
          if (data.role === 1) {
            history.push("/manage-event/event-list");
          } else if (data.role === 2) {
            history.push("/manage-event/attendance-list");
          } else if (data.role === 3) {
            history.push("/event");
          }
        })
        .catch((err) => {
          setMessage(err.response.data.error);
          setModal(true);
          setLoading(false);
        });
    };

    if (token) {
      fetchData();
    } else {
      if (
        userData.email &&
        userData.name &&
        userData.accessToken &&
        userData.refreshToken
      ) {
        if (userData.role === 1) {
          history.push("/manage-event/event-list");
        } else if (userData.role === 2) {
          history.push("/manage-event/attendance-list");
        } else if (userData.role === 3) {
          history.push("/event");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logIn = async (loginData) => {
    setLoading(true);
    await axios
      .post(`${REACT_APP_REQUEST_URL}/login`, loginData)
      .then((res) => {
        const data = {
          email: loginData.userEmail,
          name: res.data.name,
          role: res.data.role,
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        };
        setUserData(data);
        if (data.role === 1) {
          history.push("/manage-event/event-list");
        } else if (data.role === 2) {
          history.push("/manage-event/attendance-list");
        } else if (data.role === 3) {
          history.push("/event");
        }
      })
      .catch((err) => {
        setMessage(err.response.data.error);
        setModal(true);
        setLoading(false);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <LogIn modal={modal} message={message} logIn={logIn} />
    </React.Fragment>
  );
};

export default LogInPage;
