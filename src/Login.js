import { Card, CardBody, Row, Col, CardTitle, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "./Redux/Auth/action";
import { useEffect, useState } from "react";
import ErrorHandler from "./HOC/ErrorHandler";
import { useNavigate } from "react-router-dom";
import { errorNotification } from "./Constant";
import { NotificationContainer } from "react-notifications";

const Login = ({ errors, errorHandler, errorHandlerInBulk }) => {
  const login = useSelector((state) => state.authReducer);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      if (login?.message) errorNotification(login?.message, "Login");
  },[login])


  const handleSubmit = async () => {
    try {
      let errorObjectList = [];
      if (!user?.email) {
        errorObjectList.push({
          errorMessage: "Name is mandatory",
          key: "name",
        });
      }
      if (!user?.password) {
        errorObjectList.push({
          errorMessage: "Name is mandatory",
          key: "name",
        });
      }
      await errorHandlerInBulk(errorObjectList);
      if (errorObjectList.length === 0) {
        dispatch(loginUser(user, navigate));
      }
    } catch (error) {
      console.error("Exception in Login " + error?.message);
    }
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
      <NotificationContainer />
      <Button className="float-end m-3" onClick={() => navigate('/register')}>Register</Button>
      <Card style={{ position: "absolute", top: "30%", left: "40%" }}>
        <CardTitle className="text-center">Login</CardTitle>
        <CardBody>
          <form>
            <Row className="mb-2">
              <Col xxl="12" xs="12" md="12">
                <input
                  style={{ width: "300px" }}
                  type="email"
                  name="email"
                  value={user?.email}
                  onChange={(e) =>
                    handlOnChange({
                      name: e.currentTarget.name,
                      value: e.currentTarget.value,
                    })
                  }
                  placeholder="Enter your email"
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
                  value={user?.password}
                  onChange={(e) =>
                    handlOnChange({
                      name: e.currentTarget.name,
                      value: e.currentTarget.value,
                    })
                  }
                  placeholder="Enter your password"
                ></input>
              </Col>
              {errors?.password && (
                <div className="d-block invalid-feedback">
                  {errors?.password}
                </div>
              )}
            </Row>
            <Button color="primary" size="xs" onClick={handleSubmit}>
              Login
            </Button>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default ErrorHandler(Login);
