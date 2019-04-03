import {GET_NEWS_ERROR, GET_NEWS_SUCCESS} from "../constants/news";

const initialState = {
  news: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWS_SUCCESS:
      return {
        ...state,
        news: action.news,
        error: null,
      };
    case GET_NEWS_ERROR:
      return {
        ...state,
        error: action.message,
      };
    default:
      return state
  }
};
