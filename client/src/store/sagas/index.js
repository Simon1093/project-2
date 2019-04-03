import { fork, all } from 'redux-saga/effects';
import sagaGetNews from './news';
import sagaGetUser from './loginUser';
import sagaAddUser from './addUser';
import sagaLogout from './logout';
import sagaGetCreated from './getUser';
import sagaAddNews from './addNews'
import sagaFindNews from './findNews'
import sagaUploadImage from './uploadImage'
import sagaUploadAvatar from './uploadAvatar'
import sagaEditUser from './editUser'
import sagaGetAuthor from './getAuthor'
import sagaGoogleAuth from './googleOAuth'

export default function* root() {
  yield all([
    fork(sagaGetNews),
    fork(sagaGetUser),
    fork(sagaAddUser),
    fork(sagaLogout),
    fork(sagaGetCreated),
    fork(sagaAddNews),
    fork(sagaFindNews),
    fork(sagaUploadImage),
    fork(sagaUploadAvatar),
    fork(sagaEditUser),
    fork(sagaGetAuthor),
    fork(sagaGoogleAuth),
  ]);
}



