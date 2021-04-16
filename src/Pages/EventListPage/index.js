import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Loading } from "../../Components";
import { LayoutManageEvent, EventList } from "../../Containers";
import axios from "axios";
import useUserData from "../../LocalStorage/useUserData";

const EventListPage = (props) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(window.outerWidth <= 600 ? false : true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [committee, setCommitee] = useState([]);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const { userData, setUserData, removeUserData } = useUserData();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios
        .get("http://localhost:8000/event/lists", {
          headers: {
            authorization: `Bearer ${userData.accessToken}`,
          },
        })
        .then((res) => {
          setData(res.data.result);
          setLoading(false);
        })
        .catch((err) => {
          if (
            err.response.data.error &&
            err.response.data.error === "jwt expired"
          ) {
            axios
              .post("http://localhost:8000/token", {
                userEmail: userData.email,
                refreshToken: userData.refreshToken,
              })
              .then((res) => {
                let tmp = userData;
                tmp.accessToken = res.data.accessToken;
                setUserData(tmp);
                fetchData();
              })
              .catch((err) => {
                removeUserData();
                history.push("../..");
              });
          } else {
            removeUserData();
            history.push("../..");
          }
        });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteEvent = async (event) => {
    setError(false);
    setAlert(false);
    setMessage("");
    setLoading(true);
    await axios
      .delete("http://localhost:8000/event/delete", {
        headers: {
          authorization: `Bearer ${userData.accessToken}`,
        },
        data: { idEvent: event },
      })
      .then((res) => {
        setAlert(true);
        setMessage(res.data.message);
        setData(res.data.result);
        setLoading(false);
      })
      .catch((err) => {
        if (
          err.response.data.error &&
          err.response.data.error === "jwt expired"
        ) {
          axios
            .post("http://localhost:8000/token", {
              userEmail: userData.email,
              refreshToken: userData.refreshToken,
            })
            .then((res) => {
              let tmp = userData;
              tmp.accessToken = res.data.accessToken;
              setUserData(tmp);
              deleteEvent();
            })
            .catch((err) => {
              removeUserData();
              history.push("../..");
            });
        } else {
          setAlert(true);
          setError(true);
          let errorMessage = "Error";
          if (err.response.data.error) {
            errorMessage = err.response.data.error;
          }
          setMessage(errorMessage);
          setLoading(false);
        }
      });
  };

  const committeeEvent = async (event) => {
    await axios
      .get(`http://localhost:8000/committee/lists/${event}`, {
        headers: { authorization: `Bearer ${userData.accessToken}` },
      })
      .then((res) => {
        setCommitee(res.data.result);
      })
      .catch((err) => {
        if (
          err.response.data.error &&
          err.response.data.error === "jwt expired"
        ) {
          axios
            .post("http://localhost:8000/token", {
              userEmail: userData.email,
              refreshToken: userData.refreshToken,
            })
            .then((res) => {
              let tmp = userData;
              tmp.accessToken = res.data.accessToken;
              setUserData(tmp);
              deleteEvent();
            })
            .catch((err) => {
              committeeEvent();
              history.push("../..");
            });
        } else {
          removeUserData();
          history.push("/");
        }
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <LayoutManageEvent
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      page={"event-list"}
      title={"Event"}
    >
      <EventList
        data={data}
        committee={committee}
        alert={alert}
        error={error}
        message={message}
        deleteEvent={deleteEvent}
        committeeEvent={committeeEvent}
      />
    </LayoutManageEvent>
  );
};

export default EventListPage;
