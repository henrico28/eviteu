import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

const SandBox = (props) => {
  const history = useHistory();
  let { id } = useParams();

  useEffect(() => {
    if (!id) {
      console.log("hai");
      history.push("sandbox/1");
    }
  }, [history, id]);

  return (
    <React.Fragment>
      <button>Hai</button>
    </React.Fragment>
  );
};

export default SandBox;
