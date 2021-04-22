import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Loading } from "../../Components";
import {
  LayoutManageEvent,
  NotFound,
  Error,
  AssignEvent,
} from "../../Containers";
import axios from "axios";
import useUserData from "../../LocalStorage/useUserData";

const AssignEventPage = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(window.outerWidth <= 600 ? false : true);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [errorRequest, setErrorRequest] = useState(false);
  const [committee, setCommittee] = useState([]);
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
        if (error === "No event found") {
          setNotFound(true);
        } else {
          setErrorRequest(true);
        }
        setLoading(false);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await axios
        .get(`http://localhost:8000/committee/assigned/${id}`, {
          headers: {
            authorization: `Bearer ${userData.accessToken}`,
          },
        })
        .then((res) => {
          setData(res.data.result);
          axios
            .get("http://localhost:8000/committee/lists", {
              headers: {
                authorization: `Bearer ${userData.accessToken}`,
              },
            })
            .then((res) => {
              setCommittee(res.data.result);
              setLoading(false);
            })
            .catch((err) => {
              let error = "";
              if (err.response && err.response.data.error) {
                error = err.response.data.error;
              }
              errorHandling(error);
            });
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

  const assignEvent = async (data) => {
    setLoading(true);
    await axios
      .post("http://localhost:8000/committee/assign", data, {
        headers: { authorization: `Bearer ${userData.accessToken}` },
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
              assignEvent(data);
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
      page={"committee-list"}
      title={"Committee / Assign Event"}
    >
      <AssignEvent
        id={id}
        committee={committee}
        data={data}
        alert={alert}
        error={error}
        message={message}
        assignEvent={assignEvent}
      />
    </LayoutManageEvent>
  );
};

export default AssignEventPage;
