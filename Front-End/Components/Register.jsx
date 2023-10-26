import React, { useState, useContext } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { MyContext } from "../src/App";

import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/Login.css";

const Register = () => {
  const {
    setLoginRegisterFlag,
    setAlertMessage,
    setAlertMessageType,
    setShowAlert,
  } = useContext(MyContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const LoginRegisterSwitch = () => {
    setLoginRegisterFlag(true);
    setShowAlert(false);
  };

  const handleRegisterClick = async () => {
    try {
      const userData = {
        name: name,
        password: password,
      };
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        userData
      );
      if (response.status === 201) {
        setShowAlert(true);
        setAlertMessageType("success");
        setAlertMessage(`User ${name} Created Successfully`);
      }
    } catch (error) {
      var defaultErr =
        error.response.data.err?.code ||
        error.response.data?.msg ||
        error.response.data.err.message ||
        "Unknown Error Accorded";

      setAlertMessageType("warning");

      if (defaultErr === 11000) {
        setAlertMessage(`User with name ( ${name} ) already exist`);
      } else {
        setAlertMessage(defaultErr);
      }
      setShowAlert(true);
    }
  };

  return (
    <Container className="login-container">
      <h1 className="text-center mb-5">Register</h1>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FloatingLabel>
          </Col>
          <Col lg={6}>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <div className="d-grid gap-2 mt-3">
          <Button variant="primary" size="lg" onClick={handleRegisterClick}>
            Register
          </Button>
        </div>
        <div className="text-center mt-3">
          <p>
            Already have an account? <a onClick={LoginRegisterSwitch}>Login</a>
          </p>
        </div>
      </Form>
    </Container>
  );
};

export default Register;
