import {
    GET_USERS,
    SAVE_USERS
  } from "./types";
  
  export const getUsers = (data,history) => ({
    type: GET_USERS,
    payload: {data,history}
  })

  export const saveUsers = (data,message) => ({
    type: SAVE_USERS,
    payload: {data,message}
  })


  