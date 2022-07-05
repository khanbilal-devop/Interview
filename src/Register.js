import { useState } from "react";
import { Button, Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import ErrorHandler from "./HOC/ErrorHandler";
import axios from "axios";
import { useNavigate  } from "react-router-dom";
import {
  BASE_API,
  DEFAULT_MESSAGE,
  successNotification,
  errorNotification,
} from "./Constant";
import {
  NotificationContainer,
} from "react-notifications";
import './Register.css' 

const Register = ({ errors, errorHandler, errorHandlerInBulk }) => {
  const MODULE = "Register";
  const [user, setUser] = useState({});
  const navigate = useNavigate ();

  const handleSubmit = async (e) => {
    try {
      let errorObjectList = [];
      let userObj = { ...user };

      if (!userObj?.name) {
        errorObjectList.push({
          errorMessage: "Name is mandatory",
          key: "name",
        });
      }
      if (!userObj?.email) {
        errorObjectList.push({
          errorMessage: "Email is mandatory",
          key: "email",
        });
      }
      if (!userObj?.password) {
        errorObjectList.push({
          errorMessage: "Password is mandatory",
          key: "password",
        });
      }

      if (userObj?.password && userObj?.password !== userObj?.confirmPassword) {
        errorObjectList.push({
          errorMessage: "Confirm password doesn't match",
          key: "confirmPassword",
        });
      }
      await errorHandlerInBulk(errorObjectList);
      if (errorObjectList.length === 0) {
       let added =  add(userObj);
       if(added){ 
        setUser({});
        navigate('/login')
      }
      }
    } catch (error) {
      console.error("Error in Register.handleSbmit " + error?.message);
    }
  };

  const add = async (data) => {
    let added = true;
    try {
      let response = await axios
        .post(`${BASE_API}/user/`, data)
        .then((res) => res?.data)
        .catch((err) => {
          added = false;
          return err?.response?.data || DEFAULT_MESSAGE;
        });
      if (response?.status === 200) {
        successNotification(response?.message, MODULE);
      } else {
        errorNotification(response?.message, MODULE);
      }
    } catch (error) {
      added = false;
      console.error("Error in Register.handleSbmit " + error?.message);
    }
    return added;
  };

  const handlOnChange = async ({ name, value }) => {
    let userObj = { ...user };
    userObj = {
      ...userObj,
      [name]: value,
    };
    await errorHandler("", name);
    setUser(userObj);
  };

  return (
    <>
     { false ? <div className="loading" >Hello</div> :<><NotificationContainer />
      <Card
        style={{
          position: "absolute",
          top: "20%",
          left: "40%",
          width: "350px",
        }}
      >
        <CardTitle className="text-center">Register</CardTitle>
        <CardBody>
          <form>
            <Row className="mb-2">
              <Col xxl="12" xs="12" md="12">
                {/* <label className="w-10">Name </label> */}
                <input
                  style={{ width: "300px" }}
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  onChange={(e) =>
                    handlOnChange({
                      name: e.currentTarget.name,
                      value: e.currentTarget.value,
                    })
                  }
                ></input>
              </Col>
              {errors?.name && (
                <div className="d-block invalid-feedback">{errors?.name}</div>
              )}
            </Row>
            <Row className="mb-2">
              <Col xxl="12" xs="12" md="12">
                {/* <label className="w-10">Name </label> */}
                <input
                  style={{ width: "300px" }}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={(e) =>
                    handlOnChange({
                      name: e.currentTarget.name,
                      value: e.currentTarget.value,
                    })
                  }
                ></input>
              </Col>
              {errors?.email && (
                <div className="d-block invalid-feedback">{errors?.email}</div>
              )}
            </Row>
            <Row className="mb-2">
              <Col xxl="12" xs="12" md="12">
                <input
                  style={{ width: "300px" }}
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={(e) =>
                    handlOnChange({
                      name: e.currentTarget.name,
                      value: e.currentTarget.value,
                    })
                  }
                ></input>
              </Col>
              {errors?.password && (
                <div className="d-block invalid-feedback">
                  {" "}
                  {errors?.password}
                </div>
              )}
            </Row>
            <Row className="mb-2">
              <Col xxl="12" xs="12" md="12">
                <input
                  style={{ width: "300px" }}
                  type="password"
                  name="confirmPassword"
                  placeholder="Enter your confirm password"
                  onChange={(e) =>
                    handlOnChange({
                      name: e.currentTarget.name,
                      value: e.currentTarget.value,
                    })
                  }
                ></input>
              </Col>
              {errors?.confirmPassword && (
                <div className="d-block invalid-feedback w-100">
                  {" "}
                  {errors?.confirmPassword}
                </div>
              )}
            </Row>
            <Button color="primary" size="xxs" onClick={handleSubmit}>
              Register
            </Button>
          </form>
        </CardBody>
      </Card></>}
    </>
  );
};

export default ErrorHandler(Register);
