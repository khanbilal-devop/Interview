import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGOUT_USER
  } from "./types";
  
  export const loginUser = (data,history) => ({
    type: LOGIN_USER,
    payload: {data,history}
  })

  export const loginUserError = (data) => ({
    type: LOGIN_USER_ERROR,
    payload: data
  })

  
  export const loginUserSuccess = (data) => ({
    type: LOGIN_USER_SUCCESS,
    payload: data
  })

  export const logoutUser =(history) => ({
    type: LOGOUT_USER,
    payload: history
  })

  