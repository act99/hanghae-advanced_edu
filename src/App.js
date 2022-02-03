import { Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import PostList from "./pages/PostList";
import Profile from "./pages/Profile";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./app/store";
import { actionCreators as userActions } from "./app/services/loginReducer";
import { useDispatch } from "react-redux";
import React from "react";
import { apiKey } from "./shared/firebase";
import AddBtn from "./components/AddBtn";
import Permit from "./shared/Permit";
import AddPost from "./pages/AddPost";
import Detail from "./pages/Detail";

function App() {
  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;
  React.useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  }, []);
  return (
    <>
      <ConnectedRouter history={history}>
        <NavBar />
        <Route path="/" exact component={PostList} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/addpost" exact component={AddPost} />
        <Route path="/detail" exact component={Detail} />
        <Permit>
          <AddBtn />
        </Permit>
        {/* {is_session === true ? <AddBtn /> : null} */}
      </ConnectedRouter>
    </>
  );
}

export default App;
