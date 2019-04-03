import {ADD_NEWS_REQUEST} from "../constants/addNews";


export const addNews = payload => ({
  type: ADD_NEWS_REQUEST,
  payload,
});
