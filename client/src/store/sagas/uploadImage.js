import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios';
import {UPLOAD_IMAGE_ERROR, UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS} from "../constants/uploadImage";

function* fetchNews () {
  try {
    const options = {
      url: '/news/uploadImage',
      method: 'post'
    };

    const { data } = yield call(axios, options);

    yield put({type: UPLOAD_IMAGE_SUCCESS, news: data});
  }
  catch (e) {
    yield put({type: UPLOAD_IMAGE_ERROR, message: e.message});
  }
}

export default function* mySaga() {
  yield takeEvery(UPLOAD_IMAGE_REQUEST, fetchNews);
}
