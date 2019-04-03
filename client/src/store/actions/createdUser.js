import {GET_USER_LOCALSTORAGE_REQUEST} from '../constants/createdUser'

export const getCreatedUser = (token) => ({
  type: GET_USER_LOCALSTORAGE_REQUEST,
  payload: token
});
