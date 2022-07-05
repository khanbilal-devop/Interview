import { useSelector } from "react-redux";
import {Navigate} from 'react-router-dom'

const Protected = ({ children }) => {
  const user = useSelector((state) => state.authReducer);
  if (!user?.loggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default Protected;
