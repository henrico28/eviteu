import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Loading } from "../../Components";
import { Error, Event } from "../../Containers";
import axios from "axios";
import useUserData from "../../LocalStorage/useUserData";

const EventPage = (props) => {
  const { REACT_APP_REQUEST_URL } = process.env;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [errorRequest, setErrorRequest] = useState(false);
  const [data, setData] = useState([]);
  const [announcement, setAnnouncement] = useState([]);
  const [step, setStep] = useState("");
  const { userData, setUserData, removeUserData } = useUserData();

  useEffect(() => {
    const errorHandling = async (error) => {
      if (error === "jwt expired") {
        await axios
          .post(`${REACT_APP_REQUEST_URL}/token`, {
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
        .get(`${REACT_APP_REQUEST_URL}/event/information`, {
          headers: {
            authorization: `Bearer ${userData.accessToken}`,
          },
        })
        .then((res) => {
          setStep(res.data.result[0].status ? 2 : 0);
          setData(res.data.result[0]);
          axios
            .get(`${REACT_APP_REQUEST_URL}/announcement/publishedLists`, {
              headers: {
                authorization: `Bearer ${userData.accessToken}`,
              },
            })
            .then((res) => {
              setAnnouncement(res.data.result);
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
  }, []);

  const logOut = async () => {
    setLoading(true);
    await axios
      .delete(`${REACT_APP_REQUEST_URL}/logout`, {
        data: {
          userEmail: userData.email,
          refreshToken: userData.refreshToken,
        },
      })
      .then((res) => {
        removeUserData();
        history.push("/");
      })
      .catch((err) => {
        removeUserData();
        history.push("/");
      });
  };

  const rsvpGuest = async (guest) => {
    setLoading(true);
    await axios
      .put(`${REACT_APP_REQUEST_URL}/guest/rsvp`, guest, {
        headers: {
          authorization: `Bearer ${userData.accessToken}`,
        },
      })
      .then((res) => {
        setStep(guest.status ? 2 : 0);
        setLoading(false);
        console.log(res.data.message);
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data.error &&
          err.response.data.error === "jwt expired"
        ) {
          axios
            .post(`${REACT_APP_REQUEST_URL}/token`, {
              userEmail: userData.email,
              refreshToken: userData.refreshToken,
            })
            .then((res) => {
              let tmp = userData;
              tmp.accessToken = res.data.accessToken;
              setUserData(tmp);
              rsvpGuest(guest);
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

  if (loading) {
    return <Loading />;
  }

  if (errorRequest) {
    return <Error />;
  }

  return (
    <React.Fragment>
      <Event
        step={step}
        data={data}
        guest={userData.name}
        announcement={announcement}
        logOut={logOut}
        rsvpGuest={rsvpGuest}
      />
    </React.Fragment>
  );
};

export default EventPage;
