import { put, takeEvery } from 'redux-saga/effects'
import {LOGOUT_ERROR, LOGOUT_SUCCESS, LOGOUT_REQUEST} from "../constants/logout";

function* logoutUser () {
  try {

    yield put({type: LOGOUT_SUCCESS});
  }
  catch (e) {
    yield put({type: LOGOUT_ERROR, message: e.message});
  }
}

export default function* mySaga() {
  yield takeEvery(LOGOUT_REQUEST, logoutUser);
}
