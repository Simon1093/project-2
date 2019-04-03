import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios';
import {GET_USER_GUEST_ERROR, GET_USER_GUEST_REQUEST, GET_USER_GUEST_SUCCESS} from "../constants/getUserGuest";

function* getAuthor (action) {
  try {
    const options = {
      url: `/users/get-guest/${action.payload}`,
      method: 'get',
    };

    const { data } = yield call(axios, options);

    yield put({type: GET_USER_GUEST_SUCCESS, user: data});
  }
  catch (e) {
    yield put({type: GET_USER_GUEST_ERROR, message: e.message});
  }
}

export default function* mySaga() {
  yield takeEvery(GET_USER_GUEST_REQUEST, getAuthor);
}
