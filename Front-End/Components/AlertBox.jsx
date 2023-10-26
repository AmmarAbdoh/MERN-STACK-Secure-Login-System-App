import Alert from "react-bootstrap/Alert";
import React, { useContext } from "react";
import { MyContext } from "../src/App";

import "../Style/AlertBox.css";
const AlertBox = ({ message, type }) => {
  const { setAlertMessage, setShowAlert } = useContext(MyContext);
  const onClose = () => {
    setShowAlert(false);
  };
  return (
    <div className="alert-box">
      <Alert
        key={type}
        variant={type}
        className="mt-4 alert-message"
        dismissible
        onClose={onClose}
      >
        {message}
      </Alert>
    </div>
  );
};
export default AlertBox;
