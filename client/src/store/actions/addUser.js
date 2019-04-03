import {ADD_USER_REQUEST} from "../constants/addUser";

export const addUser = (firstName, secondName, email, password) => ({
    type: ADD_USER_REQUEST,
    payload: { firstName, secondName, email, password }
});
