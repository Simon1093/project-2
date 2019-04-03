import {ADD_NEWS_ERROR, ADD_NEWS_SUCCESS} from "../constants/addNews";

const initialState = {
  success: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEWS_SUCCESS:
      return {
        ...state,
        success: true,
        error: null,
      };
    case ADD_NEWS_ERROR:
      return {
        ...state,
        success: false,
        error: action.message,
      };
    default:
      return state
  }
};
