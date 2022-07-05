import axios from "axios";
const BASE_API ="http://localhost:8080"

export const loginService = (user) => {
  return axios.post(`${BASE_API}/app/authenticate`, user);
};
