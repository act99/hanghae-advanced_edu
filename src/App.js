import { Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import PostList from "./pages/PostList";
import Profile from "./pages/Profile";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./app/store";
function App() {
  return (
    <>
      <ConnectedRouter history={history}>
        <NavBar />
        <Route path="/" exact component={PostList} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/profile" exact component={Profile} />
      </ConnectedRouter>
    </>
  );
}

export default App;
