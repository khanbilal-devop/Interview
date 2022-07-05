import axios from "axios";
import { getHeader } from "../../Helpers/token";
const BASE_API ="http://localhost:8080"

export const getUsersService = (searchParam) => {
  return axios.get(`${BASE_API}/user`, { headers: getHeader(), params: searchParam });
};
