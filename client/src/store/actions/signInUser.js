import {GET_USER_ID_REQUEST} from "../constants/loginUser";

export const signInUser = (email, password) => ({
  type: GET_USER_ID_REQUEST,
  payload: {email, password}
});
