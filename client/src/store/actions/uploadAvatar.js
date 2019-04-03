import {UPLOAD_AVATAR_REQUEST} from "../constants/uploadAvatar";

export const uploadAvatar = payload => ({
  type: UPLOAD_AVATAR_REQUEST,
  payload
});
