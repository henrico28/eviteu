import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Loading } from "../../Components";
import { LayoutManageEvent, Error, CommitteeList } from "../../Containers";
import axios from "axios";
import useUserData from "../../LocalStorage/useUserData";

const CommitteeListPage = (props) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(window.outerWidth <= 600 ? false : true);
  const [loading, setLoading] = useState(false);
  const [errorRequest, setErrorRequest] = useState(false);
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const { userData, setUserData, removeUserData } = useUserData();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios
        .get("http://localhost:8000/committee/lists", {
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

  const activateCommittee = async (committee) => {
    setError(false);
    setAlert(false);
    setMessage("");
    setLoading(true);
    await axios
      .put("http://localhost:8000/committee/activate", committee, {
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
              deleteCommittee();
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

  const deleteCommittee = async (committee) => {
    setError(false);
    setAlert(false);
    setMessage("");
    setLoading(true);
    await axios
      .delete("http://localhost:8000/committee/delete", {
        headers: {
          authorization: `Bearer ${userData.accessToken}`,
        },
        data: committee,
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
              deleteCommittee();
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

  if (errorRequest) {
    return <Error />;
  }

  return (
    <LayoutManageEvent
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      page={"committee"}
      title={"Committee"}
    >
      <CommitteeList
        data={data}
        alert={alert}
        error={error}
        message={message}
        activateCommittee={activateCommittee}
        deleteCommittee={deleteCommittee}
      />
    </LayoutManageEvent>
  );
};

export default CommitteeListPage;
