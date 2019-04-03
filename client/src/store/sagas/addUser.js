import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios';
import {ADD_USER_ERROR, ADD_USER_REQUEST, ADD_USER_SUCCESS} from "../constants/addUser";

function* addUser (action) {
  try {
    const options = {
      url: '/users/register',
      method: 'post',
      data: action.payload
    };

    const { data } = yield call(axios, options);

    yield put({type: ADD_USER_SUCCESS, status: data});
  }
  catch (e) {
    let email = false;
    if (e.status===401) email="Email already exist";
    yield put({type: ADD_USER_ERROR, message: email||e.message});
  }
}

export default function* mySaga() {
  yield takeEvery(ADD_USER_REQUEST, addUser);
}
