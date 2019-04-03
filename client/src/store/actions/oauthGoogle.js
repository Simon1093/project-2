import {GOOGLE_REGISTER_REQUEST} from "../constants/oauthGoogle";

export const googleAuth = token => ({
  type: GOOGLE_REGISTER_REQUEST, payload: token
});
