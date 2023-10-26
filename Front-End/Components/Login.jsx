import Form from "react-bootstrap/Form";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { MyContext } from "../src/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/Login.css";
import { useState, useContext } from "react";

const Login = () => {
  const {
    setLoginRegisterFlag,
    setAlertMessage,
    setAlertMessageType,
    setShowAlert,
    setDashBoardFlag,
    setDashboardMessage,
  } = useContext(MyContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const LoginRegisterSwitch = () => {
    setLoginRegisterFlag(false);
    setShowAlert(false);
  };

  const handleLoginClick = async () => {
    try {
      const userData = {
        name: name,
        password: password,
      };

      const { data } = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        userData
      );

      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/auth/dashboard",
          {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          }
        );

        const dashboardMsg = {
          welcome: response.data.msg,
          message: response.data.secret,
        };
        setShowAlert(false);
        setDashboardMessage(dashboardMsg);
        setDashBoardFlag(true);
      } catch (error) {
        setAlertMessage(error);
        setShowAlert(true);
      }
    } catch (error) {
      var defaultErr =
        error.response.data?.msg ||
        error.response.data.err.message ||
        "Unknown Error Accorded";

      setAlertMessageType("warning");

      setAlertMessage(defaultErr);

      setShowAlert(true);
    }
  };
  return (
    <>
      <Container className="login-container">
        <h1 className="text-center mb-5">Login</h1>
        <Form>
          <Row>
            <Col lg={6}>
              <FloatingLabel
                controlId="floatingInput"
                label="Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="name@example.com"
                  onChange={(e) => setName(e.target.value)}
                />
              </FloatingLabel>
            </Col>
            <Col lg={6}>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <div className="d-grid gap-2 mt-3">
            <Button variant="primary" size="lg" onClick={handleLoginClick}>
              Login
            </Button>
          </div>
          <div className="text-center mt-3">
            <p>
              Not a member? <a onClick={LoginRegisterSwitch}>Register</a>
            </p>
          </div>
        </Form>
      </Container>
    </>
  );
};
export default Login;
