import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { storage } from "../../shared/firebase";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";
const DELETE_IMAGE = "DELETE_IMAGE";
const UPDATE_IMAGE = "UPDATE_IMAGE";

const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
const deleteImage = createAction(DELETE_IMAGE, (image_url) => ({ image_url }));
const updateImage = createAction(UPDATE_IMAGE, (image_url) => ({ image_url }));

const initialState = {
  image_url: "",
  uploading: false,
  preview: null,
};

const uploadImageFB = (image) => {
  return function (dispatch, getState, { history }) {
    dispatch(uploading(true));
    const storage = getStorage();

    const storageRef = ref(storage, `images/${image.name}`);
    uploadBytes(storageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        dispatch(uploadImage(url));
        console.log(url);
      });
    });
  };
};
const deleteImageFB = (image) => {
  return function (dispatch, getState, { history }) {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${image.name}`);
    deleteObject(storageRef)
      .then(() => {
        console.log("이미지가 삭제되었습니다.");
      })
      .catch((error) => console.log("이미지 삭제 실패 : ", error));
  };
};

export default handleActions(
  {
    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.image_url = action.payload.image_url;
        draft.uploading = false;
      }),
    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
    [DELETE_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.image_url = action.payload.image_url;
      }),
    [DELETE_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.image_url = action.payload.image_url;
      }),
  },
  initialState
);

const actionCreators = {
  uploadImageFB,
  setPreview,
  deleteImageFB,
  uploadImageFB,
};

export { actionCreators };
