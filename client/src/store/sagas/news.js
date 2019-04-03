import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios';
import {GET_NEWS_ERROR, GET_NEWS_REQUEST, GET_NEWS_SUCCESS} from "../constants/news";

function* fetchNews () {
  try {
    const options = {
      url: '/news',
      method: 'get'
    };

    const { data } = yield call(axios, options);

    yield put({type: GET_NEWS_SUCCESS, news: data});
  }
  catch (e) {
    yield put({type: GET_NEWS_ERROR, message: e.message});
  }
}

export default function* mySaga() {
  yield takeEvery(GET_NEWS_REQUEST, fetchNews);
}
