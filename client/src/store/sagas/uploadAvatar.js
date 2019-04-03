import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios';
import {UPLOAD_AVATAR_ERROR, UPLOAD_AVATAR_REQUEST, UPLOAD_AVATAR_SUCCESS} from "../constants/uploadAvatar";

function* uploadAvatar (action) {
  try {
    const options = {
      url: `/users/uploadAvatar/${action.payload.id}`,
      method: 'post',
      'Content-type': 'multipart/form-data',
      headers: {'authorization': action.payload.token},
      data: action.payload.avatar
    };

    const { data } = yield call(axios, options);

    yield put({type: UPLOAD_AVATAR_SUCCESS, avatar: data.avatar});
  }
  catch (e) {
    yield put({type: UPLOAD_AVATAR_ERROR, message: e.message});
  }
}

export default function* mySaga() {
  yield takeEvery(UPLOAD_AVATAR_REQUEST, uploadAvatar);
}
