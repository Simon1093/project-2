import {GET_USER_GUEST_REQUEST} from "../constants/getUserGuest";

export const getUser = id => ({
  type: GET_USER_GUEST_REQUEST,
  payload: id
});
