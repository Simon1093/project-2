import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios';
import {
  GET_USER_LOCALSTORAGE_ERROR,
  GET_USER_LOCALSTORAGE_REQUEST,
  GET_USER_LOCALSTORAGE_SUCCESS
} from "../constants/createdUser";

function* getUser (action) {
  try {
    const options = {
      url: '/users/get',
      method: 'get',
      headers: {'authorization':action.payload},
    };

    const { data } = yield call(axios, options);

    yield put({type: GET_USER_LOCALSTORAGE_SUCCESS, user: data});
  }
  catch (e) {
    yield put({type: GET_USER_LOCALSTORAGE_ERROR, message: e.message});
  }
}

export default function* mySaga() {
  yield takeEvery(GET_USER_LOCALSTORAGE_REQUEST, getUser);
}
