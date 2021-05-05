import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Loading } from "../../Components";
import {
  LayoutManageEvent,
  WarningNoEvent,
  Error,
  GuestList,
  NotFound,
} from "../../Containers";
import axios from "axios";
import useUserData from "../../LocalStorage/useUserData";

const GuestListPage = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(window.outerWidth <= 600 ? false : true);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [errorRequest, setErrorRequest] = useState(false);
  const [noEvent, setNoEvent] = useState(false);
  const [event, setEvent] = useState([]);
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const { userData, setUserData, removeUserData } = useUserData();

  useEffect(() => {
    const errorHandling = async (error) => {
      if (error === "jwt expired") {
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
    };

    const fetchData = async () => {
      setLoading(true);
      await axios
        .get("http://localhost:8000/event/lists", {
          headers: {
            authorization: `Bearer ${userData.accessToken}`,
          },
        })
        .then((res) => {
          if (res.data.result.length === 0) {
            if (id) {
              setNotFound(true);
            } else {
              setNoEvent(true);
            }
            setLoading(false);
          } else {
            if (!id) {
              history.push(
                `/manage-event/guest-list/${res.data.result[0].idEvent}`
              );
            } else {
              setEvent(res.data.result);
              axios
                .get(`http://localhost:8000/guest/lists/${id}`, {
                  headers: {
                    authorization: `Bearer ${userData.accessToken}`,
                  },
                })
                .then((res) => {
                  setData(res.data.result);
                  setLoading(false);
                })
                .catch((err) => {
                  let error = "";
                  if (err.response && err.response.data.error) {
                    error = err.response.data.error;
                  }
                  errorHandling(error);
                });
            }
          }
        })
        .catch((err) => {
          let error = "";
          if (err.response && err.response.data.error) {
            error = err.response.data.error;
          }
          errorHandling(error);
        });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const inviteAllGuest = async (guest) => {
    setError(false);
    setAlert(false);
    setMessage("");
    setLoading(true);
    await axios
      .put("http://localhost:8000/guest/inviteAll", guest, {
        headers: {
          authorization: `Bearer ${userData.accessToken}`,
        },
      })
      .then((res) => {
        setAlert(true);
        setMessage(res.data.message);
        setData(res.data.result);
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
              inviteAllGuest();
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

  const inviteGuest = async (guest) => {
    setError(false);
    setAlert(false);
    setMessage("");
    setLoading(true);
    await axios
      .put("http://localhost:8000/guest/invite", guest, {
        headers: {
          authorization: `Bearer ${userData.accessToken}`,
        },
      })
      .then((res) => {
        setAlert(true);
        setMessage(res.data.message);
        setData(res.data.result);
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
              inviteGuest();
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

  const deleteGuest = async (guest) => {
    setError(false);
    setAlert(false);
    setMessage("");
    setLoading(true);
    await axios
      .delete("http://localhost:8000/guest/delete", {
        headers: {
          authorization: `Bearer ${userData.accessToken}`,
        },
        data: guest,
      })
      .then((res) => {
        setAlert(true);
        setMessage(res.data.message);
        setData(res.data.result);
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
              deleteGuest();
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
      page={"guest"}
      title={"Guest"}
    >
      {noEvent ? (
        <WarningNoEvent />
      ) : (
        <GuestList
          id={id}
          event={event}
          data={data}
          alert={alert}
          setAlert={setAlert}
          error={error}
          message={message}
          inviteAllGuest={inviteAllGuest}
          inviteGuest={inviteGuest}
          deleteGuest={deleteGuest}
        />
      )}
    </LayoutManageEvent>
  );
};

export default GuestListPage;
