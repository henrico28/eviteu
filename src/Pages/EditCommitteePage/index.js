import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Loading } from "../../Components";
import { LayoutManageEvent, EditCommittee } from "../../Containers";
import axios from "axios";
import useUserData from "../../LocalStorage/useUserData";

const EditCommitteePage = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(window.outerWidth <= 600 ? false : true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const { userData, setUserData, removeUserData } = useUserData();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios
        .get(`http://localhost:8000/committee/detail/${id}`, {
          headers: {
            authorization: `Bearer ${userData.accessToken}`,
          },
        })
        .then((res) => {
          if (res.data.length === 0) {
            history.push("/404");
          } else {
            setData(res.data.result[0]);
            setLoading(false);
          }
        })
        .catch((err) => {
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
            removeUserData();
            history.push("/");
          }
        });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateCommittee = async (data) => {
    setError(false);
    setAlert(false);
    setMessage("");
    setLoading(true);
    await axios
      .put("http://localhost:8000/committee/update", data, {
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
              updateCommittee(data);
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
      page={"committee-list"}
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
