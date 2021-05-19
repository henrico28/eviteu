import React, { useState } from "react";
import { Loading, SignUp } from "../../Containers";
import axios from "axios";

const SignUpPage = (props) => {
  const { REACT_APP_REQUEST_URL } = process.env;
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageContent, setMessageContent] = useState("");

  const signUp = async (user) => {
    setError(false);
    setLoading(true);
    await axios
      .post(`${REACT_APP_REQUEST_URL}/host/create`, user)
      .then((res) => {
        setMessageTitle("Successful");
        setMessageContent(res.data.message);
      })
      .catch((err) => {
        setError(true);
        setMessageTitle("Error");
        setMessageContent(err.response.data.error);
      });
    setModal(true);
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <SignUp
        modal={modal}
        error={error}
        messageTitle={messageTitle}
        messageContent={messageContent}
        signUp={signUp}
      />
    </React.Fragment>
  );
};

export default SignUpPage;
