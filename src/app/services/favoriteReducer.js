import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";

const SET_FAVORITE = "SET_FAVORITE";
const ADD_FAVORITE = "ADD_FAVORITE";

const setFavorite = createAction(SET_FAVORITE, (user_id, post_id) => ({
  user_id,
  post_id,
}));
const addFavorite = createAction(ADD_FAVORITE, (user_id, post_id) => ({
  user_id,
  post_id,
}));

const initialState = {
  list: {},
};

const addFavoriteFB = (user_id, post_id) => {
  return function (dispatch, getState, { history }) {
    const post = getState().post.list.find((item) => item.id === post_id);
    const user_info = getState().user.user;
    const uid = user_info.user_id;
    let favorite = {
      post_id: post.id,
    };
    favorite[uid] = user_info.user_id;
    const favoriteDB = firestore.collection("favorite", post_id);
    favoriteDB.add(favorite).then((doc) => {
      dispatch(addFavorite(post_id, user_id));
    });
  };
};

export default handleActions(
  {
    [SET_FAVORITE]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id] = action.payload.user_id;
      }),
    [ADD_FAVORITE]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id].unshift(action.payload.user_id);
      }),
  },
  initialState
);

const actionCreators = {
  addFavoriteFB,
  addFavorite,
};

export { actionCreators };
