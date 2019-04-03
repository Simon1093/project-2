import {EDIT_USER_REQUEST} from "../constants/editUser";

export const editUser = payload => ({
  type:EDIT_USER_REQUEST,
  payload
});
