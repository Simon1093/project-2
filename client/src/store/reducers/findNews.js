import {FIND_NEWS_ERROR, FIND_NEWS_SUCCESS} from "../constants/findNews";

const initialState = {
  news: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FIND_NEWS_SUCCESS:
      return {
        ...state,
        news: [...action.news],
        error: null,
      };
    case FIND_NEWS_ERROR:
      return {
        ...state,
        error: action.message,
      };
    default:
      return state
  }
};
