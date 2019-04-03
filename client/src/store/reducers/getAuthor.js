import {GET_USER_GUEST_ERROR, GET_USER_GUEST_SUCCESS} from "../constants/getUserGuest";

const initialState = {
  userId: '',
  firstName:'',
  secondName:'',
  email:'',
  avatar: '',
  success:false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_GUEST_SUCCESS:
      return {
        ...state,
        userId: action.user._id,
        firstName: action.user.firstName,
        secondName: action.user.secondName,
        email: action.user.email,
        avatar: action.user.avatar,
        success: true,
        error: null,
      };
    case GET_USER_GUEST_ERROR:
      return {
        ...state,
        error: action.message,
      };

    default:
      return state
  }
};
