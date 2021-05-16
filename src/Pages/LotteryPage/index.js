import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Loading } from "../../Components";
import { NotFound, Error, Lottery } from "../../Containers";
import axios from "axios";
import useUserData from "../../LocalStorage/useUserData";

const LotteryPage = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [errorRequest, setErrorRequest] = useState(false);
  const [data, setData] = useState([]);
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
          const tmp = res.data.result;
          console.log(tmp);
          const valid = tmp.some((event) => event.idEvent === Number(id));
          if (!valid) {
            setNotFound(true);
          } else {
            axios
              .get(`http://localhost:8000/guest/attended/${id}`, {
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
      <Lottery data={data} />
    </React.Fragment>
  );
};

export default LotteryPage;
