import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import "moment";
import moment from "moment";
import { getDatabase, ref, set, update } from "firebase/database";
import { actionCreators as postActions } from "./postReducer";
import firebase from "firebase/compat/app";
const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";

const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: {},
  is_loading: false,
};

const addCommentFB = (post_id, contents) => {
  return function (dispatch, getState, { history }) {
    const commentDB = firestore.collection("comment");
    const post = getState().post.list.find((item) => item.id === post_id);
    const user_info = getState().user.user;
    let comment = {
      post_id: post_id,
      user_id: user_info.uid,
      user_name: user_info.user_name,
      user_profile: user_info.user_profile,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };
    commentDB.add(comment).then((doc) => {
      // 좋아요 눌렀을 때, postDB 댓글 카운트도 증가시키게 함
      const postDB = firestore.collection("post");
      const increment = firebase.firestore.FieldValue.increment(1);
      comment = { ...comment, id: doc.id };
      // firebase increment 를 통해 1개씩 수 추가
      postDB
        .doc(post_id)
        .update({ comment_cnt: increment })
        .then((_post) => {
          dispatch(addComment(post_id, comment));
          // firebase 는 업데이트 됐고, 이젠 state 를 바꾸어주어야할 때
          console.log(comment);
          if (post) {
            dispatch(
              postActions.editPost(post_id, {
                comment_cnt: parseInt(post.comment_cnt) + 1,
              })
            );
            //** */ firebase v9 **//
            const db = getDatabase();
            set(
              ref(db, `noti/${post.user_info.user_id}/list/${comment.id}`),
              {
                post_id: post.id,
                user_name: comment.user_name,
                image_url: post.image_url,
                insert_dt: comment.insert_dt,
              },
              (error) => {
                if (error) {
                  console.log("알림저장실패", error);
                } else {
                  const Data = {
                    read: false,
                  };
                  const updates = {};
                  updates["/noti/" + post.user_info.user_id] = Data;
                  update(ref(db), updates);
                }
              }
            );
            update(ref(db, `noti/${post.user_info.user_id}`), {
              read: false,
            });
          }
        });
    });
  };
};

const getCommentFB = (post_id = null) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      return;
    }
    const commentDB = firestore.collection("comment");
    commentDB
      .where("post_id", "==", post_id)
      .orderBy("insert_dt", "desc")
      .get()
      .then((docs) => {
        let list = [];
        docs.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });

        dispatch(setComment(post_id, list));
      })
      .catch((err) => {
        console.log("댓글정보 에러, commentReducer 쪽 확인", err);
        alert("댓글 정보를 가져올 수 없습니다.");
      });
  };
};

export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        // let data = {[post_id] : com_list, ...}
        draft.list[action.payload.post_id] = action.payload.comment_list;
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id].unshift(action.payload.comment);
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  getCommentFB,
  setComment,
  addComment,
  addCommentFB,
};

export { actionCreators };
