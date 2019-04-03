import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios';
import {GET_USER_ID_ERROR, GET_USER_ID_SUCCESS} from "../constants/loginUser";
import {GOOGLE_REGISTER_REQUEST} from "../constants/oauthGoogle";

function* addUser (action) {
  try {
    const options = {
      url: '/users/oauth/google',
      method: 'post',
      data: {access_token: action.payload}
    };

    const { data } = yield call(axios, options);

    yield put({type: GET_USER_ID_SUCCESS, user: data.user, token: data.token});
  }
  catch (e) {
    yield put({type: GET_USER_ID_ERROR, message: "Email already exist"});
  }
}

export default function* mySaga() {
  yield takeEvery(GOOGLE_REGISTER_REQUEST, addUser);
}
