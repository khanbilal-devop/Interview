import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Table } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "./Redux/Users/actions";
import { logoutUser } from "./Redux/Auth/action";
import { userSearchParam } from "./Constant";
import Pagination from "react-js-pagination";
import { useNavigate } from "react-router-dom";


const Listing = () => {
  const user = useSelector((state) => state.user);
  const [searchParam, setSearchParam] = useState(userSearchParam);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers(searchParam));
  }, [searchParam,dispatch]);


  const onChangePage = (pageNo) => {
    let searchParamObj = { ...searchParam };
    searchParamObj = {
      ...searchParamObj,
      currentPage: pageNo,
    };
    setSearchParam(searchParamObj);
  };

  return (
    <>
      <Row>
        <Col xs="12" lg = "12" md="12">
      <Button size="xs" className="float-end m-2" onClick={() => dispatch(logoutUser(navigate))}>
        Logout
      </Button>
      </Col>
      </Row>
      <Row>
        <Col md = "12">
          <Card>
            <Table striped bordered hover responsive className="r-table hTable">
              <thead>
                <tr>
                  <th width="30%">Id</th>
                  <th width="30%">Name</th>
                  <th width="30%">Email</th>
                </tr>
              </thead>
              <tbody>
                {(user?.users?.data || []).map((each) => (
                  <tr key={each?.id}>
                    <td>{each?.id}</td>
                    <td>{each?.name}</td>
                    <td>{each?.email}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
      <div className="d-flex justify-content-center p-2">
        <Pagination
          activePage={searchParam?.currentPage}
          itemsCountPerPage={searchParam?.pageSize}
          totalItemsCount={user?.users?.totalElements || 0}
          pageRangeDisplayed={user?.users?.totalPages || 0}
          onChange={(pageNo) => onChangePage(pageNo)}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    </>
  );
};

export default Listing;
