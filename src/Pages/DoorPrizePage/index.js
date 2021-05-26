import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Loading, NotFound, Error, DoorPrize } from "../../Containers";
import axios from "axios";
import useUserData from "../../Hooks/useUserData";

const DoorPrizePage = (props) => {
  const { REACT_APP_REQUEST_URL } = process.env;
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [errorRequest, setErrorRequest] = useState(false);
  const [data, setData] = useState([]);
  const { userData, setUserData, removeUserData } = useUserData();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      axios
        .get(`${REACT_APP_REQUEST_URL}/guest/attended/${id}`, {
          headers: {
            authorization: `Bearer ${userData.accessToken}`,
          },
        })
        .then((res) => {
          setData(res.data.result);
          setLoading(false);
        })
        .catch((err) => {
          if (err.response && err.response.data.error) {
            if (err.response.data.error === "jwt expired") {
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
            } else if (err.response.data.error === "No event found") {
              setNotFound(true);
              setLoading(false);
            }
          } else {
            setErrorRequest(true);
            setLoading(false);
          }
        });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <React.Fragment>
      <DoorPrize data={data} />
    </React.Fragment>
  );
};

export default DoorPrizePage;
