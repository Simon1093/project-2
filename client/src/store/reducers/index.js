import { combineReducers } from "redux";


import newsReducer from './news'
import authReducer from './authReducer'
import addNewsReducer from './addNews'
import findNewsReducer from './findNews'
import getAuthorReducer from './getAuthor'

export default combineReducers({
  newsReducer,
  authReducer,
  addNewsReducer,
  findNewsReducer,
  getAuthorReducer
})
