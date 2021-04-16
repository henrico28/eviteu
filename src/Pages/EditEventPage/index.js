import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Loading } from "../../Components";
import { LayoutManageEvent, EditEvent } from "../../Containers";
import axios from "axios";
import useUserData from "../../LocalStorage/useUserData";

const EditEventPage = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(window.outerWidth <= 600 ? false : true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [type, setType] = useState([]);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const { userData, setUserData, removeUserData } = useUserData();

  useEffect(() => {
    const errorHandling = async (error) => {
      if (error === "jwt expired") {
        await axios
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
    };

    const fetchData = async () => {
      setLoading(true);
      await axios
        .get(`http://localhost:8000/event/detail/${id}`, {
          headers: {
            authorization: `Bearer ${userData.accessToken}`,
          },
        })
        .then((res) => {
          if (res.data.length === 0) {
            history.push("../../404");
          } else {
            setData(res.data.result[0]);
            axios
              .get("http://localhost:8000/type/lists", {
                headers: {
                  authorization: `Bearer ${userData.accessToken}`,
                },
              })
              .then((res) => {
                setLoading(false);
                setType(res.data.result);
              })
              .catch((err) => {
                let error = "";
                if (err.response.data.error) {
                  error = err.response.data.error;
                }
                errorHandling(error);
              });
          }
        })
        .catch((err) => {
          let error = "";
          if (err.response.data.error) {
            error = err.response.data.error;
          }
          errorHandling(error);
        });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateEvent = async (data) => {
    setError(false);
    setAlert(false);
    setMessage("");
    setLoading(true);
    await axios
      .put("http://localhost:8000/event/update", data, {
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
              updateEvent(data);
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

  if (loading) {
    return <Loading />;
  }

  return (
    <LayoutManageEvent
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      page={"event-list"}
      title={"Event / Edit Event"}
    >
      <EditEvent
        data={data}
        type={type}
        alert={alert}
        error={error}
        message={message}
        updateEvent={updateEvent}
      />
    </LayoutManageEvent>
  );
};

export default EditEventPage;
