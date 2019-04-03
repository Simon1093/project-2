import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios';
import {FIND_NEWS_ERROR, FIND_NEWS_REQUEST, FIND_NEWS_SUCCESS} from "../constants/findNews";

function* findNews (action) {

  try {
    const options = {
      url: '/news/find',
      method: 'post',
      data: {userId: action.payload}
    };

    const { data } = yield call(axios, options);


    yield put({type: FIND_NEWS_SUCCESS, news: data});
  }
  catch (e) {
    yield put({type: FIND_NEWS_ERROR, message: e.message});
  }
}

export default function* mySaga() {
  yield takeEvery(FIND_NEWS_REQUEST, findNews);
}
