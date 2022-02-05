import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { db, firestore, storage } from "../../shared/firebase";
// import "moment"
import moment from "moment";
import { actionCreators as imageActions } from "./imageReducer";
import { getDoc, setDoc, doc as document } from "firebase/firestore";
import { update } from "lodash";

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
              console.log(post);
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
    console.log(_image);
    console.log(getState());
    const _post_idx = getState().post.list.findIndex((item) => item.id === id);
    const _post = getState().post.list[_post_idx];
    console.log(_post);
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
            console.log(url);
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
          console.log(_post);
          let post = Object.keys(_post).reduce(
            (acc, cur) => {
              return { ...acc, [cur]: _post[cur] };
            },
            { id: doc.id, user_info: {} }
          );

          post_list.push(post);
          console.log(post_list);
        });
        post_list.pop();

        dispatch(setPost(post_list, paging));
      });
  };
};

// const getPostFB = (start = null, size = 3) => {
//   return function (dispatch, getState, { history }) {
//     // let _paging = getState().post.paging;
//     // if (_paging.start && !_paging.next) {
//     //   return;
//     // }
//     // dispatch(loading(true));
//     // const postDB = firestore.collection("post");
//     // let query = postDB.orderBy("insert_dt", "desc").limit(size + 1);
//     // if (start) {
//     //   query = query.startAt(start);
//     // }
//     // query
//     //   .limit(size + 1)
//     //   .get()
//     //   .then((docs) => {
//     //     let post_list = [];
//     //     let paging = {
//     //       start: docs.docs[0],
//     //       next:
//     //         docs.docs.length === size + 1
//     //           ? docs.docs[docs.docs.length - 1]
//     //           : null,
//     //       size: size,
//     //     };
//     //     docs.forEach((doc) => {
//     //       let _post = doc.data();
//     //       let post = Object.keys(_post).reduce(
//     //         (acc, curr) => {
//     //           if (curr.indexOf("user_") !== -1) {
//     //             return {
//     //               ...acc,
//     //               user_info: { ...acc.user_info, [curr]: _post[curr] },
//     //             };
//     //           }
//     //           return { ...acc, [curr]: _post[curr] };
//     //         },
//     //         { id: doc.id, user_info: {} }
//     //       );
//     //       post_list.push(post);
//     //     });
//     //     post_list.pop();
//     //     dispatch(setPost(post_list, paging));
//     //   });
//     //** */
//     let _paging = getState().post.paging;
//     if (_paging.start && !_paging.next) {
//       return;
//     }
//     dispatch(loading(true));
//     const postDB = firestore.collection("post");
//     let query = postDB.orderBy("insert_dt", "desc");

//     if (start) {
//       query = query.startAt(start);
//     }
//     query
//       .limit(size + 1)
//       .get()
//       .then((docs) => {
//         let post_list = [];
//         console.log(docs.docs);
//         let paging = {
//           start: docs.docs[0],
//           next:
//             docs.docs.length === size + 1
//               ? docs.docs[docs.docs.length - 1]
//               : null,
//           size: size,
//         };
//         docs.forEach((doc) => {
//           let _post = doc.data();
//           let post = Object.keys(_post).reduce(
//             (acc, curr) => {
//               if (curr.indexOf("user_") !== -1) {
//                 return {
//                   ...acc,
//                   user_info: { ...acc.user_info, [curr]: _post[curr] },
//                 };
//               }
//               return { ...acc, [curr]: _post[curr] };
//             },
//             { id: doc.id, user_info: {} }
//           );
//           post_list.push(post);
//         });
//         post_list.pop();
//         dispatch(setPost(post_list, paging));
//       });
//   };
// };

// const getPostFB = () => {
//   return function (dispatch, getState, { history }) {
//     const postDB = firestore.collection("post");
//     let query = postDB.orderBy("insert_dt", "desc").limit(2);
//     query.get().then((docs) => {
//       let post_list = [];
//       docs.forEach((doc) => {
//         let _post = doc.data();
//         let post = Object.keys(_post).reduce(
//           (acc, curr) => {
//             if (curr.indexOf("user_") !== -1) {
//               return {
//                 ...acc,
//                 ...acc.user_info,
//                 [curr]: _post[curr],
//               };
//             }
//             return { ...acc, [curr]: _post[curr] };
//           },
//           { id: doc.id, user_info: {} }
//         );
//         post_list.push(post);
//       });
//       dispatch(setPost(post_list));
//     });
//     return;
//     postDB.get().then((docs) => {
//       let post_list = [];
//       docs.forEach((doc) => {
//         let _post = doc.data();
//         let post = Object.keys(_post).reduce(
//           (acc, curr) => {
//             if (curr.indexOf("user_") !== -1) {
//               return {
//                 ...acc,
//                 ...acc.user_info,
//                 [curr]: _post[curr],
//               };
//             }
//             return { ...acc, [curr]: _post[curr] };
//           },
//           { id: doc.id, user_info: {} }
//         );
//         post_list.push(post);
//       });
//       dispatch(setPost(post_list));
//     });
//   };
// };

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);
        draft.paging = action.payload.paging;
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
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB,
  updatePostFB,
};

export { actionCreators };
