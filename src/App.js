import { Card, CardBody, Row, Col, CardTitle, Button } from "reactstrap";
import "./App.css";

function App() {
  return (
    <>
    <Button className="float-end m-3">Register</Button>
      <Card style={{ position: "absolute", top: "40%", left: "40%" }}>
        <CardTitle className="text-center">Login</CardTitle>
        <CardBody>
          <form>
            <Row className="mb-2">
              <Col xxl="12" xs="12" md="12">
                {/* <label className="w-10">Name </label> */}
                <input
                  type="text"
                  name="name"
                  onChange={(e) => console.log(e)}
                  placeholder="Enter your email"
                ></input>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col xxl="12" xs="12" md="12">
                <input
                  type="password"
                  name="password"
                  onChange={(e) => console.log(e)}
                  placeholder="Enter your password"
                ></input>
              </Col>
            </Row>
            <Button type="submit" color="primary" size="xs">
              Login
            </Button>
          </form>
        </CardBody>
      </Card>
    </>
  );
}

export default App;
