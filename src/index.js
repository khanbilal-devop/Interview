import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-notifications/lib/notifications.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Listing from "./Listing";
import Register from "./Register";
import { Provider } from "react-redux";
import { configureStore } from "./Redux/store";
import Protected from "./Protected";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={configureStore()}>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Navigate to="login" />} />
        <Route
          exact
          path="listing"
          element={
            <Protected>
              <Listing />
            </Protected>
          }
        />
        <Route exact path="login" element={<Login />} />
        <Route exact path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
