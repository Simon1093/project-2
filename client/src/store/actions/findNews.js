import {FIND_NEWS_REQUEST} from "../constants/findNews";

export const findNews = (userId) => ({
  type:FIND_NEWS_REQUEST, payload: userId
});
