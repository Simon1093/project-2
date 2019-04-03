import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios';
import {ADD_NEWS_ERROR, ADD_NEWS_REQUEST, ADD_NEWS_SUCCESS} from "../constants/addNews";
import {FIND_NEWS_REQUEST} from "../constants/findNews";

function* addNews (action) {
  try {
    const optionsNews = {
      url: '/news/addNews',
      method: 'post',
      headers: {'authorization': action.payload.token},
      data: action.payload.newsData,
    };


    const { data: newsId } = yield call(axios, optionsNews);
    const optionsImage = {
      url: `/news/uploadImage/${newsId}`,
      method: 'post',
      data: action.payload.image,
      'Content-Type': 'multipart/form-data'
    };
    yield call(axios, optionsImage);

    yield put({type: ADD_NEWS_SUCCESS});
    yield put({type: FIND_NEWS_REQUEST, payload: action.payload.newsData.author.id});
  }
  catch (e) {
    yield put({type: ADD_NEWS_ERROR, message: e.message});
  }
}

export default function* mySaga() {
  yield takeEvery(ADD_NEWS_REQUEST, addNews);
}
