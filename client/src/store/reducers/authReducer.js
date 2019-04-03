import {ADD_USER_ERROR, ADD_USER_SUCCESS} from "../constants/addUser";
import {GET_USER_ID_ERROR, GET_USER_ID_SUCCESS} from "../constants/loginUser";
import {LOGOUT_ERROR, LOGOUT_SUCCESS} from "../constants/logout";
import {GET_USER_LOCALSTORAGE_ERROR, GET_USER_LOCALSTORAGE_SUCCESS} from "../constants/createdUser";
import {UPLOAD_AVATAR_ERROR, UPLOAD_AVATAR_SUCCESS} from "../constants/uploadAvatar";
import {EDIT_USER_ERROR, EDIT_USER_SUCCESS} from "../constants/editUser";

const initialState = {
  userId: '',
  status:'',
  firstName:'',
  secondName:'',
  email:'',
  avatar: '',
  success:false,
  error: null,
  avatarError: false,
  editError: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_SUCCESS:
      return {
        ...state,
        status: action.status,
        error: null,
      };
    case ADD_USER_ERROR:
      return {
        ...state,
        success:false,
        error: action.message,
      };
    case 'CHANGE_STATUS':
      return {
        ...state,
        status: ''
      };
    case GET_USER_ID_SUCCESS:
      localStorage.setItem('token', action.token);
      return {
        ...state,
        userId: action.user._id,
        firstName: action.user.firstName,
        secondName: action.user.secondName,
        email: action.user.email,
        token: action.user.token,
        avatar: action.user.avatar,
        success: true,
        error: null,
      };
    case GET_USER_ID_ERROR:
      return {
        ...state,
        error: action.message,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return {
        ...state,
        userId: '',
        firstName: '',
        secondName: '',
        avatar: '',
        email: '',
        success: false,
        error: null,
      };
    case LOGOUT_ERROR:
      return {
        ...state,
        error: action.message,
      };
    case GET_USER_LOCALSTORAGE_SUCCESS:
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
    case GET_USER_LOCALSTORAGE_ERROR:
      return {
        ...state,
        success:false,
        error: action.message,
      };
    case UPLOAD_AVATAR_SUCCESS:
      return {
        ...state,
        avatar: action.avatar
      };
    case UPLOAD_AVATAR_ERROR:
      return {
        ...state,
        avatarError: true,
        error: action.message
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        firstName: action.user.firstName,
        secondName: action.user.secondName,
        email: action.user.email,
      };
    case EDIT_USER_ERROR:
      return{
        ...state,
        editError: action.message
      };
    default:
      return state
  }
};
