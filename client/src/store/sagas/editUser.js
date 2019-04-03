import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios';
import {EDIT_USER_ERROR, EDIT_USER_REQUEST, EDIT_USER_SUCCESS} from "../constants/editUser";
import {FIND_NEWS_REQUEST} from "../constants/findNews";

function* editUser (action) {
  try {
    const optionsNews = {
      url: `/users/editUsers/${action.payload.id}`,
      method: 'put',
      headers:{
        'authorization':action.payload.token
      },
      data: action.payload.user,
    };
    const { data } = yield call(axios, optionsNews);

    yield put({type: EDIT_USER_SUCCESS, user: data});
    yield put({type: FIND_NEWS_REQUEST, payload: action.payload.id});
  }
  catch (e) {
    yield put({type: EDIT_USER_ERROR, message: e.message});
  }
}

export default function* mySaga() {
  yield takeEvery(EDIT_USER_REQUEST, editUser);
}
