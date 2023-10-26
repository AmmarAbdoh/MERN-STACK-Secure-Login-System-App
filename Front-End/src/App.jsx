import Login from "../Components/Login";
import Register from "../Components/Register";
import Dashboard from "../Components/Dashboard";
import AlertBox from "../Components/AlertBox";
import { createContext, useContext, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const MyContext = createContext();

function App() {
  const [LoginRegisterFlag, setLoginRegisterFlag] = useState(true);
  const [DashboardFlag, setDashBoardFlag] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [DashboardMessage, setDashboardMessage] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [alertMessageType, setAlertMessageType] = useState("primary");

  return (
    <>
      <MyContext.Provider
        value={{
          setLoginRegisterFlag,
          setShowAlert,
          setAlertMessage,
          setAlertMessageType,
          setShowAlert,
          setDashBoardFlag,
          setDashboardMessage,
          DashboardMessage,
        }}
      >
        {DashboardFlag ? (
          <Dashboard />
        ) : LoginRegisterFlag ? (
          <Login />
        ) : (
          <Register />
        )}
        {showAlert ? (
          <AlertBox message={alertMessage} type={alertMessageType} />
        ) : null}
      </MyContext.Provider>
    </>
  );
}

export default App;
