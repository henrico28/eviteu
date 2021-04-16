import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Loading } from "../../Components";
import { LayoutManageEvent, CommitteeList } from "../../Containers";
import axios from "axios";
import useUserData from "../../LocalStorage/useUserData";

const CommitteeListPage = (props) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(window.outerWidth <= 600 ? false : true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
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
                history.push("../..");
              });
          } else {
            removeUserData();
            history.push("../..");
          }
        });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <LayoutManageEvent
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      page={"committee-list"}
      title={"Committee"}
    >
      <CommitteeList data={data} />
    </LayoutManageEvent>
  );
};

export default CommitteeListPage;
