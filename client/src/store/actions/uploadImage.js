import {UPLOAD_IMAGE_REQUEST} from "../constants/uploadImage";

export const uploadImage = (image) => ({
  type:UPLOAD_IMAGE_REQUEST, payload: image
});
