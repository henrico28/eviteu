import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Loading } from "../../Components";
import {
  LayoutManageEvent,
  NotFound,
  Error,
  AddAnnouncement,
} from "../../Containers";
import axios from "axios";
import useUserData from "../../LocalStorage/useUserData";

const AddAnnouncementPage = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(window.outerWidth <= 600 ? false : true);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [errorRequest, setErrorRequest] = useState(false);
  const [event, setEvent] = useState([]);
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
          const tmp = res.data.result;
          const valid = tmp.some((event) => event.idEvent === Number(id));
          if (!valid) {
            setNotFound(true);
          } else {
            setEvent(tmp);
          }
          setLoading(false);
        })
        .catch((err) => {
          if (
            err.response &&
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
                history.push("/");
              });
          } else {
            setErrorRequest(true);
            setLoading(false);
          }
        });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addAnnouncement = async (announcement) => {
    setError(false);
    setAlert(false);
    setMessage("");
    setLoading(true);
    await axios
      .post("http://localhost:8000/announcement/create", announcement, {
        headers: { authorization: `Bearer ${userData.accessToken}` },
      })
      .then((res) => {
        setAlert(true);
        setMessage(res.data.message);
        setLoading(false);
      })
      .catch((err) => {
        if (
          err.response &&
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
              addAnnouncement(announcement);
            })
            .catch((err) => {
              removeUserData();
              history.push("/");
            });
        } else {
          setAlert(true);
          setError(true);
          let errorMessage = "Error";
          if (err.response && err.response.data.error) {
            errorMessage = err.response.data.error;
          }
          setMessage(errorMessage);
          setLoading(false);
        }
      });
  };

  if (loading) {
    return <Loading />;
  }

  if (notFound) {
    return <NotFound />;
  }

  if (errorRequest) {
    return <Error />;
  }

  return (
    <LayoutManageEvent
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      page={"announcement"}
      title={"Announcement / Add Announcement"}
    >
      <AddAnnouncement
        id={id}
        event={event}
        alert={alert}
        setAlert={setAlert}
        error={error}
        message={message}
        addAnnouncement={addAnnouncement}
      />
    </LayoutManageEvent>
  );
};

export default AddAnnouncementPage;
