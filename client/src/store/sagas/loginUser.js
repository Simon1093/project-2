import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios';
import {GET_USER_ID_REQUEST, GET_USER_ID_ERROR, GET_USER_ID_SUCCESS} from "../constants/loginUser";

function* loginUser (action) {
  try {
    const options = {
      url: '/users/login',
      method: 'post',
      data: action.payload
    };

    const { data } = yield call(axios, options);

    yield put({type: GET_USER_ID_SUCCESS, user: data.user, token: data.token});
  }
  catch (e) {
    yield put({type: GET_USER_ID_ERROR, message: "incorrect email or password"});
  }
}

export default function* mySaga() {
  yield takeEvery(GET_USER_ID_REQUEST, loginUser);
}
