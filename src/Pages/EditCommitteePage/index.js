import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Loading,
  LayoutManageEvent,
  NotFound,
  Error,
  EditCommittee,
} from "../../Containers";
import axios from "axios";
import useUserData from "../../Hooks/useUserData";

const EditCommitteePage = (props) => {
  const { REACT_APP_REQUEST_URL } = process.env;
  const history = useHistory();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(window.outerWidth <= 600 ? false : true);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [errorRequst, setErrorRequest] = useState(false);
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const { userData, setUserData, removeUserData } = useUserData();
  console.log(notFound);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios
        .get(`${REACT_APP_REQUEST_URL}/committee/detail/${id}`, {
          headers: {
            authorization: `Bearer ${userData.accessToken}`,
          },
        })
        .then((res) => {
          if (res.data.result.length === 0) {
            setNotFound(true);
          } else {
            setData(res.data.result[0]);
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
        });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateCommittee = async (committee) => {
    setError(false);
    setAlert(false);
    setMessage("");
    setLoading(true);
    await axios
      .put(`${REACT_APP_REQUEST_URL}/committee/update`, committee, {
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
            .post(`${REACT_APP_REQUEST_URL}/token`, {
              userEmail: userData.email,
              refreshToken: userData.refreshToken,
            })
            .then((res) => {
              let tmp = userData;
              tmp.accessToken = res.data.accessToken;
              setUserData(tmp);
              updateCommittee(committee);
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

  if (errorRequst) {
    return <Error />;
  }

  return (
    <LayoutManageEvent
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      page={"committee"}
      title={"Committee / Edit Committee"}
    >
      <EditCommittee
        data={data}
        alert={alert}
        error={error}
        message={message}
        updateCommittee={updateCommittee}
      />
    </LayoutManageEvent>
  );
};

export default EditCommitteePage;
