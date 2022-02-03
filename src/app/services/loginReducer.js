import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { deleteCookie, setCookie } from "../../shared/Cookie";
import { auth } from "../../shared/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  signOut,
} from "firebase/auth";
// actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// action creators
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));
// initialState
const initialState = {
  user: null,
  is_login: false,
};

// middleware actions

const loginFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    const auth = getAuth();
    // 세션에 인증 지속 추가
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, id, pwd)
          .then((userCredential) => {
            // Signed in
            console.log("로그인 완료");
            console.log(userCredential);
            const user = userCredential.user;
            dispatch(
              setUser({
                user_name: user.displayName,
                id: id,
                user_profile: "",
                uid: user.uid,
              })
            );
            history.push("/");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
};

// 로그인

const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            user_name: user.displayName,
            user_profile: "",
            id: user.email,
            uid: user.uid,
          })
        );
      } else {
        dispatch(logOut());
      }
    });
  };
};

const signupFB = (id, pwd, name) => {
  return function (dispatch, getState, { history }) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, id, pwd)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            dispatch(
              setUser({
                user_name: name,
                id: id,
                user_profile: "",
                uid: user.uid,
              })
            );
            history.push("/");
          })
          .catch((error) => {
            console.log(error.code, error.message);
          });

        console.log(user);
        history.push("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };
};

// 로그아웃

const logoutFB = () => {
  return function (dispatch, getState, { history }) {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(logOut());
        history.replace("/");
        console.log("로그아웃");
      })
      .catch((error) => {
        console.log(error.code, error.errorMessage);
      });
  };
};

// reducer
// draft = state의 복제품 (불변성 유지)
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// action creator export

const actionCreators = {
  logOut,
  getUser,
  signupFB,
  loginFB,
  loginCheckFB,
  logoutFB,
};

export { actionCreators };
