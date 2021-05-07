import React, { useState } from "react";
import QrReader from "react-qr-reader";

const SandBox = (props) => {
  const [result, setResult] = useState("No result");
  // const [facingMode, setFacingMode] = useState("environment");

  const handleScan = (data) => {
    if (data) {
      setResult(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <React.Fragment>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "50%" }}
      />
      <p>{result}</p>
    </React.Fragment>
  );
};

export default SandBox;
