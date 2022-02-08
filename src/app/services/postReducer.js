import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { db, firestore, storage } from "../../shared/firebase";
// import "moment"
import moment from "moment";
import { actionCreators as imageActions } from "./imageReducer";
import { getDoc, setDoc, doc as document } from "firebase/firestore";
import { update } from "lodash";
import firebase from "firebase/compat/app";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING";
const setPost = createAction(SET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const addPost = createAction(ADD_POST, (post_list) => ({ post_list }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
};

const initialPost = {
  // id: 0,
  // user_info: {
  //   user_name: "Jooseok",
  //   user_profile:
  //     "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  // },
  image_url:
    "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  contents: "고양이네요",
  comment_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
  layout: "center",
  favorite_cnt: 0,
  favorite_list: [],
};

const addPostFB = (contents = "", layout = "center") => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    const _user = getState().user.user;
    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };
    const _post = {
      ...initialPost,
      contents: contents,
      layout: layout,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };
    const _image = getState().image.preview;

    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");

    _upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          return url;
        })
        .then((url) => {
          postDB
            .add({ ...user_info, ..._post, image_url: url })
            .then((doc) => {
              let post = { user_info, ..._post, id: doc.id, image_url: url };
              dispatch(addPost(post));
              setDoc(document(db, "post", doc.id), { ...post });
              history.replace("/");
              history.go(0);
              dispatch(imageActions.setPreview(null));
            })
            .catch((error) => {
              window.alert("앗 포스트 작성에 실패했어요!");
              console.log("포스트 작성에 실패했습니다.", error);
            });
        })
        .catch((err) => {
          window.alert("앗 이미지 업로드에 문제가 있어요!");
          console.log("앗 이미지 업로드에 문제가 있어요", err);
        });
    });
  };
};

const updatePostFB = (id = null, post = {}) => {
  return async function (dispatch, getState, { history }) {
    if (!id) {
      alert("게시물 정보가 없어요!");
      console.log("게시물 정보가 없습니다. postReducer 93 번째줄");
      return;
    }
    const _image = getState().image.preview;
    const _post_idx = getState().post.list.findIndex((item) => item.id === id);
    const _post = getState().post.list[_post_idx];
    const postDB = firestore.collection("post");
    if (_image === _post.image_url) {
      postDB
        .doc(id)
        .update(post)
        .then((doc) => {
          dispatch(editPost(id, { ...post }));
          history.replace("/");
          history.go(0);
        });
      return;
    } else {
      const user_id = getState().user.uid;
      const _upload = storage
        .ref(`images/${user_id}_${new Date().getTime()}`)
        .putString(_image, "data_url");
      _upload.then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            return url;
          })
          .then((url) => {
            postDB
              .doc(id)
              .update({ ...post, image_url: url })
              .then((doc) => {
                dispatch(editPost(id, { ...post, image_url: url }));
                history.replace("/");
                history.go(0);
              });
          })
          .catch((error) => {
            alert("이미지 업로드에 문제가 있습니다.");
            console.log("이미지 업로드 에러 129번째 ", error);
          });
      });
    }
  };
};

// id => postID, post => 수정할 포스트 데이터
const favoriteFB = (id = null, user_id = null) => {
  return async function (dispatch, getState, { history }) {
    if (!id) {
      alert("게시물 정보가 없어요!");
      console.log("게시물 정보가 없습니다. postReducer 93 번째줄");
      return;
    }

    const post_index = getState().post.list.findIndex((item) => item.id === id);
    const _post = getState().post.list[post_index];
    const post = { ..._post };
    console.log(post);
    console.log(post.favorite_list);
    if (post.favorite_list === undefined) {
      post.favorite_list = [];
    }
    const increase = {
      ...post,
      favorite_cnt: post.favorite_cnt + 1,
      favorite_list: [...post.favorite_list, user_id],
    };
    const decrease = {
      ...post,
      favorite_cnt: post.favorite_cnt - 1,
      favorite_list: [...post.favorite_list.filter((item) => item !== user_id)],
    };
    const dbIncrease = {
      favorite_list: [...post.favorite_list, user_id],
    };
    const dbDecrease = {
      favorite_list: [...post.favorite_list.filter((item) => item !== user_id)],
    };
    // const deleteList = _post.favorite_list.filter((item) => item !== user_id);
    // const addList = _post.favorite_list.push(user_id + "");
    // console.log(_post);
    // console.log(deleteList);
    console.log(post.favorite_list.includes(user_id + ""));
    if (post.favorite_list.includes(user_id + "")) {
      // dispatch(editPost(id, decrease));
      // console.log("삭제");
      // console.log(user_id);

      const increment = firebase.firestore.FieldValue.increment(-1);
      const postDB = firestore.collection("post");

      postDB
        .doc(id)
        .update({ favorite_cnt: increment })
        .then(
          console.log("마이너스 1"),
          postDB
            .doc(id)
            .update({ favorite_list: dbDecrease.favorite_list })
            .then(
              dispatch(editPost(id, decrease)),
              console.log("삭제"),
              console.log(user_id)
            )
            .catch((e) => console.log(e))
        )
        .catch((e) => console.log(e));
    } else {
      const increment = firebase.firestore.FieldValue.increment(1);
      const postDB = firestore.collection("post");

      postDB
        .doc(id)
        .update({ favorite_cnt: increment })
        .then(
          console.log("플러스 1"),
          postDB
            .doc(id)
            .update({ favorite_list: dbIncrease.favorite_list })
            .then(
              dispatch(editPost(id, increase)),
              console.log("플러스"),
              console.log(user_id)
            )
            .catch((e) => console.log(e))
        )
        .catch((e) => console.log(e));

      // dispatch(editPost(id, increase));
      // console.log(user_id);
      // console.log("추가");
      // dispatch(
      //   editPost(id, {
      //     favorite_cnt: parseInt(_post.favorite_cnt) + 1,
      //     favorite_list: [...addList],
      //   })
      // );
      // console.log(_post);
      // const increment = firebase.firestore.FieldValue.increment(0.5);
      // const postDB = firestore.collection("post");
      // favoriteList.push(user_id);
      // postDB
      //   .doc(id)
      //   .update({ favorite_cnt: increment })
      //   .then(
      //     console.log("플러스 1"),
      //     dispatch(
      //       editPost(id, { favorite_cnt: parseInt(_post.favorite_cnt) + 1 })
      //     )
      //   )
      //   .catch((error) => console.log(error));
      // postDB
      //   .doc(id)
      //   .update({ favorite_list: favoriteList })
      //   .then(
      //     console.log("리스트 안에 아이디 추가됨", favoriteList),
      //     editPost(id, { favorite_list: favoriteList })
      //   );
    }

    // if (_image === _post.image_url) {
    //   postDB
    //     .doc(id)
    //     .update({favorite_cnt:})
    //     .then((doc) => {
    //       dispatch(editPost(id, { ...post }));
    //       history.replace("/");
    //       history.go(0);
    //     });
    //   return;
    // } else {
    //   const user_id = getState().user.uid;
    //   const _upload = storage
    //     .ref(`images/${user_id}_${new Date().getTime()}`)
    //     .putString(_image, "data_url");
    //   _upload.then((snapshot) => {
    //     snapshot.ref
    //       .getDownloadURL()
    //       .then((url) => {
    //         return url;
    //       })
    //       .then((url) => {
    //         postDB
    //           .doc(id)
    //           .update({ ...post, image_url: url })
    //           .then((doc) => {
    //             dispatch(editPost(id, { ...post, image_url: url }));
    //             history.replace("/");
    //             history.go(0);
    //           });
    //       })
    //       .catch((error) => {
    //         alert("이미지 업로드에 문제가 있습니다.");
    //         console.log("이미지 업로드 에러 129번째 ", error);
    //       });
    //   });
    // }
  };
};

const getPostFB = (start = null, size = 3) => {
  return function (dispatch, getState, { history }) {
    let _paging = getState().post.paging;
    if (_paging.start && !_paging.next) {
      return;
    }
    dispatch(loading(true));
    const postDB = firestore.collection("post");
    let query = postDB.orderBy("insert_dt", "desc");
    if (start) {
      query = query.startAt(start);
    }
    query
      .limit(size + 1)
      .get()
      .then((docs) => {
        let post_list = [];
        let paging = {
          start: docs.docs[0],
          next:
            docs.docs.length === size + 1
              ? docs.docs[docs.docs.length - 1]
              : null,
          size: size,
        };

        docs.forEach((doc) => {
          let _post = doc.data();
          let post = Object.keys(_post).reduce(
            (acc, cur) => {
              return { ...acc, [cur]: _post[cur] };
            },
            { id: doc.id, user_info: {} }
          );

          post_list.push(post);
        });
        post_list.pop();

        dispatch(setPost(post_list, paging));
      });
  };
};

const getOnePostFB = (id) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    postDB
      .doc(id)
      .get()
      .then((doc) => {
        let _post = doc.data();
        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, user_info: {} }
        );
        dispatch(setPost([post]));
      });
  };
};

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);
        draft.list = draft.list.reduce((acc, curr) => {
          if (acc.findIndex((a) => a.id === curr.id) === -1) {
            return [...acc, curr];
          } else {
            acc[acc.findIndex((a) => a.id === curr.id)] = curr;
            return acc;
          }
        }, []);
        if (action.payload.paging) {
          draft.paging = action.payload.paging;
        }

        draft.is_loading = false;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post_list);
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB,
  updatePostFB,
  getOnePostFB,
  editPost,
  favoriteFB,
};

export { actionCreators };
